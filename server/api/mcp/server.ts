/**
 * MCP Server for Classic Mini DIY Calculators
 * Provides compression ratio and gearbox calculation tools for LLMs
 */

export default defineEventHandler(async (event) => {
  const method = event.method;
  const url = getRequestURL(event);
  const pathname = url.pathname;

  // Set CORS headers for MCP client compatibility
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  try {
    // MCP Server Info endpoint
    if (method === 'GET' && pathname.endsWith('/server')) {
      return {
        name: 'classic-mini-calculators',
        version: '1.0.0',
        description: 'Classic Mini DIY Calculator Tools for LLMs',
        author: 'Classic Mini DIY',
        homepage: 'https://classicminidiy.com',
        capabilities: {
          tools: true,
          resources: true,
        },
        tools: [
          {
            name: 'compression_calculator',
            description: 'Calculate compression ratio and engine capacity for Classic Mini engines',
            inputSchema: {
              type: 'object',
              properties: {
                bore: {
                  type: 'number',
                  description: 'Bore diameter in cm (e.g., 7.06 for 70.6mm)',
                  default: 7.06,
                },
                stroke: {
                  type: 'number',
                  description: 'Stroke length in cm (e.g., 8.128 for 81.28mm)',
                  default: 8.128,
                },
                pistonDish: {
                  type: 'number',
                  description: 'Piston dish volume in cc',
                  default: 6.5,
                },
                headVolume: {
                  type: 'number',
                  description: 'Cylinder head chamber volume in cc',
                  default: 25.5,
                },
                deckHeight: {
                  type: 'number',
                  description: 'Piston deck height in thousandths of an inch',
                  default: 20,
                },
                gasket: {
                  type: 'number',
                  description: 'Head gasket volume in cc (use 0 for custom)',
                  default: 3.4,
                },
                customGasket: {
                  type: 'number',
                  description: 'Custom gasket volume in cc (used when gasket is 0)',
                  default: 0.1,
                },
                decomp: {
                  type: 'number',
                  description: 'Decompression plate volume in cc',
                  default: 0,
                },
              },
            },
          },
          {
            name: 'gearbox_calculator',
            description: 'Calculate gear ratios, top speed, and speedometer compatibility for Classic Mini gearboxes',
            inputSchema: {
              type: 'object',
              properties: {
                metric: {
                  type: 'boolean',
                  description: 'Use metric units (true) or imperial (false)',
                  default: false,
                },
                final_drive: {
                  type: 'number',
                  description: 'Final drive ratio (e.g., 3.444)',
                  default: 3.444,
                },
                gear_ratios: {
                  type: 'array',
                  items: { type: 'number' },
                  description: 'Array of 4 gear ratios [1st, 2nd, 3rd, 4th]',
                  default: [2.583, 1.644, 1.25, 1.0],
                },
                drop_gear: {
                  type: 'number',
                  description: 'Drop gear ratio',
                  default: 1,
                },
                speedo_drive: {
                  type: 'number',
                  description: 'Speedometer drive ratio',
                  default: 0.3529,
                },
                max_rpm: {
                  type: 'number',
                  description: 'Maximum engine RPM',
                  default: 6500,
                },
                tire_type: {
                  type: 'object',
                  properties: {
                    width: { type: 'number', description: 'Tire width in mm' },
                    profile: { type: 'number', description: 'Tire profile percentage' },
                    size: { type: 'number', description: 'Wheel size in inches' },
                  },
                  default: { width: 145, profile: 80, size: 10 },
                },
              },
            },
          },
        ],
        resources: [
          {
            uri: 'compression://calculator',
            name: 'Compression Calculator',
            description: 'Calculate compression ratio and engine capacity',
            mimeType: 'application/json',
          },
          {
            uri: 'gearbox://calculator',
            name: 'Gearbox Calculator',
            description: 'Calculate gear ratios and speedometer compatibility',
            mimeType: 'application/json',
          },
        ],
      };
    }

    // MCP Tools endpoint - handle tool calls
    if (method === 'POST' && pathname.endsWith('/tools/call')) {
      const body = await readBody(event);
      const { name, arguments: args } = body as { name: string; arguments: any };

      if (name === 'compression_calculator') {
        // Call the compression calculator endpoint
        const baseURL = getRequestURL(event).origin;
        const response = await fetch(`${baseURL}/api/mcp/compression`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
        const response = await fetch(`${baseURL}/api/mcp/gearbox`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
    }

    // MCP Resources endpoint
    if (method === 'GET' && pathname.endsWith('/resources')) {
      return {
        resources: [
          {
            uri: 'compression://calculator',
            name: 'Compression Calculator',
            description: 'Calculate compression ratio and engine capacity for Classic Mini engines',
          },
          {
            uri: 'gearbox://calculator',
            name: 'Gearbox Calculator',
            description: 'Calculate gear ratios and speedometer compatibility for Classic Mini gearboxes',
          },
        ],
      };
    }

    // MCP Resource content endpoint
    if (method === 'GET' && pathname.endsWith('/resources/read')) {
      const query = getQuery(event);
      const uri = query.uri as string;

      if (uri === 'compression://calculator') {
        return {
          contents: [
            {
              uri: 'compression://calculator',
              mimeType: 'application/json',
              text: JSON.stringify(
                {
                  name: 'Compression Calculator',
                  description: 'Calculate compression ratio and engine capacity for Classic Mini engines',
                  endpoint: '/api/mcp/compression',
                  method: 'POST',
                  parameters: {
                    bore: 'Bore diameter in cm',
                    stroke: 'Stroke length in cm',
                    pistonDish: 'Piston dish volume in cc',
                    headVolume: 'Cylinder head chamber volume in cc',
                    deckHeight: 'Piston deck height in thousandths',
                    gasket: 'Head gasket volume in cc',
                    decomp: 'Decompression plate volume in cc',
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }

      if (uri === 'gearbox://calculator') {
        return {
          contents: [
            {
              uri: 'gearbox://calculator',
              mimeType: 'application/json',
              text: JSON.stringify(
                {
                  name: 'Gearbox Calculator',
                  description: 'Calculate gear ratios and speedometer compatibility for Classic Mini gearboxes',
                  endpoint: '/api/mcp/gearbox',
                  method: 'POST',
                  parameters: {
                    metric: 'Use metric units (boolean)',
                    final_drive: 'Final drive ratio',
                    gear_ratios: 'Array of 4 gear ratios',
                    tire_type: 'Tire specifications (width, profile, size)',
                    max_rpm: 'Maximum engine RPM',
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }

      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found',
      });
    }

    // Default response for unsupported endpoints
    throw createError({
      statusCode: 404,
      statusMessage: 'MCP endpoint not found',
    });
  } catch (error: any) {
    console.error('MCP Server error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal MCP server error',
    });
  }
});
