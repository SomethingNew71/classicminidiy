/**
 * MCP Tools Call Endpoint
 * Handles tool execution requests from MCP clients
 */

import { requireMcpAuth } from '../../../utils/mcpAuth';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }

  // Set CORS headers for MCP client compatibility
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Require authentication
  requireMcpAuth(event);

  try {
    const body = await readBody(event);
    const { name, arguments: args } = body as { name: string; arguments: any };

    if (name === 'compression_calculator') {
      // Call the compression calculator endpoint
      const baseURL = getRequestURL(event).origin;
      const authHeader = getHeader(event, 'authorization') || getHeader(event, 'Authorization');
      const response = await fetch(`${baseURL}/api/mcp/compression`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
        body: JSON.stringify(args),
      }).then((res) => res.json());

      return {
        content: [
          {
            type: 'text',
            text: `Compression Calculator Results:

**Engine Configuration:**
- Bore: ${response.inputs.bore}cm (${response.context.pistonSize})
- Stroke: ${response.inputs.stroke}cm (${response.context.crankshaft})
- Head Gasket: ${response.context.headGasket}
- Decompression Plate: ${response.context.decompPlate}

**Measurements:**
- Piston Dish: ${response.inputs.pistonDish}cc
- Head Volume: ${response.inputs.headVolume}cc
- Deck Height: ${response.inputs.deckHeight} thou

**Results:**
- **Compression Ratio: ${response.results.compressionRatio}:1**
- **Engine Capacity: ${response.results.engineCapacity}cc**
- Combustion Chamber Volume: ${response.results.combustionChamberVolume}cc

**Calculation Details:**
- Bore Radius: ${response.calculations.boreRadius}cm
- Deck Volume: ${response.calculations.deckVolume}cc
- Ringland Volume: ${response.calculations.ringlandVolume}cc
- Total Chamber Volume: ${response.calculations.totalCombustionChamberVolume}cc`,
          },
        ],
      };
    }

    if (name === 'gearbox_calculator') {
      // Call the gearbox calculator endpoint
      const baseURL = getRequestURL(event).origin;
      const authHeader = getHeader(event, 'authorization') || getHeader(event, 'Authorization');
      const response = await fetch(`${baseURL}/api/mcp/gearbox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader || '',
        },
        body: JSON.stringify(args),
      }).then((res) => res.json());

      const gearingTable = response.gearing
        .map((g: any) => `${g.gear}: ${g.ratio} (${g.totalRatio}:1 total) - Max: ${g.maxSpeed}${g.unit}`)
        .join('\n');

      const speedoMatches = response.speedometers
        .filter((s: any) => s.result === 'Perfect Match' || s.result === 'Close Match')
        .slice(0, 5)
        .map((s: any) => `${s.speedometer}: ${s.result} (${s.percentageDiff}% diff)`)
        .join('\n');

      return {
        content: [
          {
            type: 'text',
            text: `Gearbox Calculator Results:

**Configuration:**
- Tire: ${response.context.tireSize}
- Final Drive: ${response.context.finalDrive}
- Gear Ratios: ${response.context.gearRatios}
- Speedo Drive: ${response.context.speedoDrive}
- Max RPM: ${response.inputs.max_rpm}
- Units: ${response.inputs.metric ? 'Metric' : 'Imperial'}

**Performance:**
- **Top Speed: ${response.results.topSpeed}${response.results.topSpeedUnit}**
- Engine Revs per ${response.results.distanceUnit}: ${response.results.engineRevsPerDistance}
- Gearbox Turns per ${response.results.distanceUnit}: ${response.results.gearboxTurnsPerDistance}
- Tire Turns per ${response.results.distanceUnit}: ${response.results.tireTurnsPerDistance}

**Gear Ratios:**
${gearingTable}

**Tire Information:**
- Diameter: ${response.tireInfo.diameter}mm
- Circumference: ${response.tireInfo.circumference}mm
- Turns per Mile: ${response.tireInfo.turnsPerMile}

**Compatible Speedometers:**
${speedoMatches || 'No close matches found'}`,
          },
        ],
      };
    }

    throw createError({
      statusCode: 400,
      statusMessage: `Unknown tool: ${name}`,
    });
  } catch (error: any) {
    console.error('MCP Tools Call error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal MCP tools call error',
    });
  }
});
