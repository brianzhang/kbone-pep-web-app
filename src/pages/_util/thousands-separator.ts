function parseNumber(number) {
  const isNegative = number < 0;
  let numberString = String(number);

  if (isNegative) {
    numberString = numberString.slice(1);
  }

  const decimal = numberString.split(".");

  return {
    integer: decimal[0],
    fraction: decimal[1] ? `.${decimal[1]}` : "",
    sign: isNegative ? "-" : "",
  };
}

function format(number) {
  let numberString = String(number);
  while (numberString.length % 3) {
    numberString = `#${numberString}`;
  }
  let result = numberString.substr(0, 3);
  result = result.replace(/#/g, "");

  const { length } = numberString;
  for (let i = 3; i < length; i += 3) {
    result = `${result},${numberString.substr(i, 3)}`;
  }

  return result;
}

export function formatNumber(number): string {
  if (typeof number !== "number") {
    return number;
  }

  const numberString = String(number);
  const { integer, fraction, sign } = parseNumber(number);

  if (integer.length <= 3) {
    return numberString;
  }
  return `${sign}${format(integer)}${fraction}`;
}
