import colors from '../../../data/colors.json';

export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const specificColor = colors
    .filter((color) => color.id === params.id)
    .map((color) => ({
      pretty: {
        'Primary Color': color.primaryColor,
        Code: color.code,
        hasSwatch: color.hasSwatch,
        'Ditzler PPG Code': color.ditzlerPpgCode,
        'Dulux Code': color.duluxCode,
        Name: color.name,
        'Short Code': color.shortCode,
        Years: color.years,
        ID: color.id,
      },
      raw: color,
    }));

  if (specificColor.length > 0) {
    return specificColor[0];
  }
  return {};
});
