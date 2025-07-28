import { options, kphFactor } from '../../../data/models/gearing';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }

  try {
    const body = await readBody(event);

    // Default values matching the Vue component
    const {
      metric = false,
      final_drive = 3.444,
      gear_ratios = [2.583, 1.644, 1.25, 1.0],
      drop_gear = 1,
      speedo_drive = 0.3529,
      max_rpm = 6500,
      tire_type = {
        width: 145,
        profile: 80,
        size: 10,
      },
    } = body;

    // Validate inputs
    if (typeof metric !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'metric must be a boolean',
      });
    }

    if (typeof final_drive !== 'number' || final_drive <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'final_drive must be a positive number',
      });
    }

    if (!Array.isArray(gear_ratios) || gear_ratios.length !== 4) {
      throw createError({
        statusCode: 400,
        statusMessage: 'gear_ratios must be an array of 4 numbers',
      });
    }

    if (typeof max_rpm !== 'number' || max_rpm <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'max_rpm must be a positive number',
      });
    }

    if (
      !tire_type ||
      typeof tire_type.width !== 'number' ||
      typeof tire_type.profile !== 'number' ||
      typeof tire_type.size !== 'number'
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'tire_type must have width, profile, and size as numbers',
      });
    }

    // Constants
    const YARDS_IN_MILE = 1760;
    const MM_IN_YARD = 914.4;
    const pi = Math.PI;

    // Calculate tire details
    const tireInfo = {
      width: tire_type.width,
      profile: tire_type.profile,
      size: tire_type.size,
      diameter: Math.round(tire_type.width * (tire_type.profile / 100) * 2 + tire_type.size * 25.4),
      circ: 0,
      tireTurnsPerMile: 0,
    };

    tireInfo.circ = Math.round(pi * tireInfo.diameter); // in mm
    const typeCircInMiles = tireInfo.circ / (YARDS_IN_MILE * MM_IN_YARD); // in miles
    tireInfo.tireTurnsPerMile = Math.round(YARDS_IN_MILE / (tireInfo.circ / MM_IN_YARD));

    // Calculate speedometer details
    const speedoDetails = {
      turnsPerMile: Math.round(tireInfo.tireTurnsPerMile * final_drive * speedo_drive),
      engineRevsMile: Math.round(tireInfo.tireTurnsPerMile * final_drive * drop_gear),
    };

    // Calculate gearing data
    const gearingData = gear_ratios.map((ratio, index) => {
      const gearRatio = ratio * final_drive * drop_gear;
      const maxSpeedAtRpm = (max_rpm / gearRatio) * typeCircInMiles;
      const maxSpeed = metric ? Math.round(maxSpeedAtRpm * kphFactor) : Math.round(maxSpeedAtRpm);

      return {
        gear: index + 1,
        ratio: ratio,
        totalRatio: Math.round((gearRatio + Number.EPSILON) * 1000) / 1000,
        maxSpeed: maxSpeed,
        unit: metric ? 'kph' : 'mph',
      };
    });

    // Calculate top speed (4th gear)
    const topSpeedGear = gearingData[3]; // 4th gear
    const topSpeed = topSpeedGear?.maxSpeed || 0;

    // Calculate speedometer compatibility
    const speedometers = metric ? options.speedos.metric : options.speedos.imperial;
    const factor = metric ? kphFactor : 1;
    const turnsPer = speedoDetails.turnsPerMile / factor;

    const speedometerData = speedometers.map((speedometer) => {
      const calculatedSpeed = Math.round((speedometer.turns / turnsPer) * speedometer.speed);
      const difference = Math.abs(calculatedSpeed - speedometer.speed);
      const percentageDiff = Math.round((difference / speedometer.speed) * 100);

      let status = 'text-green';
      let result = 'Perfect Match';

      if (percentageDiff > 0 && percentageDiff <= 5) {
        status = 'text-primary';
        result = 'Close Match';
      } else if (percentageDiff > 5) {
        status = 'text-red';
        result = 'Poor Match';
      }

      return {
        speedometer: speedometer.name,
        turns: speedometer.turns,
        speed: calculatedSpeed,
        expectedSpeed: speedometer.speed,
        difference: difference,
        percentageDiff: percentageDiff,
        status: status,
        result: result,
      };
    });

    // Find matching options for context
    const matchingTire = options.tires.find(
      (t) =>
        t.value.width === tire_type.width && t.value.profile === tire_type.profile && t.value.size === tire_type.size
    );

    const matchingDiff = options.diffs.find((d) => d.value === final_drive);
    const matchingGearRatio = options.gearRatios.find((g) => JSON.stringify(g.value) === JSON.stringify(gear_ratios));
    const matchingSpeedoDrive = options.speedosRatios.find((s) => s.value === speedo_drive);

    // Convert display values for metric
    const displayEngineRevs = metric
      ? Math.round(speedoDetails.engineRevsMile / kphFactor)
      : speedoDetails.engineRevsMile;

    const displayGearTurns = metric ? Math.round(speedoDetails.turnsPerMile / kphFactor) : speedoDetails.turnsPerMile;

    const displayTireTurns = metric ? Math.round(tireInfo.tireTurnsPerMile / kphFactor) : tireInfo.tireTurnsPerMile;

    const distanceUnit = metric ? 'Km' : 'Mile';

    const result = {
      success: true,
      inputs: {
        metric,
        final_drive,
        gear_ratios,
        drop_gear,
        speedo_drive,
        max_rpm,
        tire_type,
      },
      results: {
        topSpeed: topSpeed,
        topSpeedUnit: metric ? 'kph' : 'mph',
        engineRevsPerDistance: displayEngineRevs,
        gearboxTurnsPerDistance: displayGearTurns,
        tireTurnsPerDistance: displayTireTurns,
        distanceUnit: distanceUnit,
      },
      gearing: gearingData,
      speedometers: speedometerData,
      tireInfo: {
        diameter: tireInfo.diameter,
        circumference: tireInfo.circ,
        turnsPerMile: tireInfo.tireTurnsPerMile,
      },
      context: {
        tireSize: matchingTire?.label || `${tire_type.width}/${tire_type.profile}r${tire_type.size} (custom)`,
        finalDrive: matchingDiff?.label || `${final_drive}:1 (custom)`,
        gearRatios: matchingGearRatio?.label || 'Custom gear ratios',
        speedoDrive: matchingSpeedoDrive?.label || `${speedo_drive}:1 (custom)`,
      },
    };

    // Set cache headers (24 hours for calculator logic)
    setHeader(event, 'Cache-Control', 'public, max-age=86400');

    return result;
  } catch (error: any) {
    console.error('Gearbox calculator error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error calculating gearbox ratios',
    });
  }
});
