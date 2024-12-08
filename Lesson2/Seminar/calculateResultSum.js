const numberPrecision = require('number-precision');

function calculateResultSum(purchases, discount) {
  let total = purchases.reduce((acc, purchase) => numberPrecision.plus(acc + purchase), 0);

  total = numberPrecision.times(total, discount);
  return total;
}

module.exports = { calculateResultSum };