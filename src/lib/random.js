
const getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

export const getNearbyRandomNumber = function (min, max, nominal, margin) {
  let belowNominal,
    aboveNominal,
    rangeMin,
    rangeMax;

  belowNominal = nominal - margin;
  aboveNominal = nominal + margin;
  rangeMin = (belowNominal < min) ? min : belowNominal;
  rangeMax = aboveNominal > max ? max : aboveNominal;
  return getRandomNumber(rangeMin, rangeMax);
};