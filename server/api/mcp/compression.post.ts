import { formOptions } from '../../../data/models/compression';
import { requireMcpAuth } from '../../utils/mcpAuth';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }

  // Require authentication
  requireMcpAuth(event);

  try {
    const body = await readBody(event);

    // Validate required parameters
    const {
      bore = 7.06,
      stroke = 8.128,
      pistonDish = 6.5,
      headVolume = 25.5,
      deckHeight = 20,
      gasket = 3.4,
      decomp = 0,
      customGasket = 0.1,
    } = body;

    // Validate numeric inputs
    const numericInputs = {
      bore,
      stroke,
      pistonDish,
      headVolume,
      deckHeight,
      gasket,
      decomp,
      customGasket,
    };

    for (const [key, value] of Object.entries(numericInputs)) {
      if (typeof value !== 'number' || isNaN(value)) {
        throw createError({
          statusCode: 400,
          statusMessage: `Invalid ${key}: must be a valid number`,
        });
      }
    }

    // Calculate compression ratio and engine capacity
    const pi = Math.PI;
    const boreRadius = bore / 2;
    const deck = deckHeight * 0.0254;
    const deckVolume = boreRadius * boreRadius * (deck / 10) * pi;
    const ringland = bore * 0.047619; // Correct for 18cc Accrallite 73.5mm pistons
    const gasketVolume = gasket === 0 ? customGasket : gasket;

    const vc = pistonDish + gasketVolume + headVolume + deckVolume + ringland + decomp;
    const preRoundratio = (stroke * (boreRadius * boreRadius) * pi + vc) / vc;
    const ratio = Math.round((preRoundratio + Number.EPSILON) * 100) / 100;

    const preRoundcap = stroke * (boreRadius * boreRadius) * pi * 4;
    const capacity = Math.round((preRoundcap + Number.EPSILON) * 100) / 100;

    // Find matching piston and crankshaft options for context
    const matchingPiston = formOptions.pistonOptions.find((p) => p.value === bore);
    const matchingCrankshaft = formOptions.crankshaftOptions.find((c) => c.value === stroke);
    const matchingGasket = formOptions.headGasketOptions.find((g) => g.value === gasket);
    const matchingDecomp = formOptions.decompPlateOptions.find((d) => d.value === decomp);

    const result = {
      success: true,
      inputs: {
        bore,
        stroke,
        pistonDish,
        headVolume,
        deckHeight,
        gasket: gasket === 0 ? customGasket : gasket,
        decomp,
      },
      results: {
        compressionRatio: ratio,
        engineCapacity: capacity,
        combustionChamberVolume: Math.round((vc + Number.EPSILON) * 100) / 100,
      },
      context: {
        pistonSize: matchingPiston?.label || `${bore}mm (custom)`,
        crankshaft: matchingCrankshaft?.label || `${stroke}mm (custom)`,
        headGasket: matchingGasket?.label || `${gasket === 0 ? customGasket : gasket}cc (custom)`,
        decompPlate: matchingDecomp?.label || `${decomp}cc (custom)`,
      },
      calculations: {
        boreRadius,
        deckVolume: Math.round((deckVolume + Number.EPSILON) * 100) / 100,
        ringlandVolume: Math.round((ringland + Number.EPSILON) * 100) / 100,
        totalCombustionChamberVolume: Math.round((vc + Number.EPSILON) * 100) / 100,
      },
    };

    // Set cache headers (24 hours for calculator logic)
    setHeader(event, 'Cache-Control', 'public, max-age=86400');

    return result;
  } catch (error: any) {
    console.error('Compression calculator error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error calculating compression ratio',
    });
  }
});
