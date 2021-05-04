// mean = sum of values / number of values

export default class Mean {
  constructor(values, type) {
    this.values = values;
    this.length = this.values.length;
    this.type = type;
  }

  normalMean() {
    let sum = this.values.reduce((sum, current) => sum + current, 0);
    return {
      equation: "mean = sum of values / number of values",
      sum,
      length: this.length,
      solution: sum / this.length,
    };
  }

  geometricMean() {
    // geometric mean = the Nth root  (n = number of values) of value multiplied by each other
    let multipliedNumbers = this.values.reduce((fac, curr) => fac * curr, 1);
    let geometricMean = Math.pow(multipliedNumbers, 1 / this.length);

    return {
      "result Of Multiplication": multipliedNumbers,
      solution: geometricMean,
      "number Of Values": this.length,
    };
  }

  harmonicMean() {
    // equals the length of the values divided by the reciprocals of the numbers
    let reciprocalsNumbers = this.values.map((num) => 1 / num);
    let summationOfReciprocalsOfNumbers = reciprocalsNumbers.reduce(
      (counter, currentNum) => counter + currentNum,
      0
    );

    return {
      summationOfReciprocalsOfNumbers,
      solution: this.length / summationOfReciprocalsOfNumbers,
    };
  }

  rootMeanSquare() {
    // rms = square root of arithmetic mean of squares of values (sqrt X^2)
    let squaredValues = this.values.map((number) => number * number);
    let squaredValuesSum = squaredValues.reduce((sum, curr) => sum + curr, 0);
    let arithmeticMeanOfSquaredValues = squaredValuesSum / this.length;
    let rootMeanSquare = Math.sqrt(arithmeticMeanOfSquaredValues);

    return {
      squaredValuesSum,
      arithmeticMeanOfSquaredValues,
      solution: rootMeanSquare,
    };
  }

  calcMean() {
    switch (this.type) {
      case "arithmetic Mean":
        return this.normalMean();
        break;
      case "geometric Mean":
        return this.geometricMean();
        break;
      case "harmonic mean":
        return this.harmonicMean();
      case "root mean square":
        return this.rootMeanSquare();
    }
  }
}
