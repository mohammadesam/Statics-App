export default class Median {
  constructor(values) {
    this.values = values;
    this.length = values.length;
    this.sortedValues = values.sort((a, b) => a - b);
  }

  normalMedian() {
    if (this.length % 2 == 0)
      return {
        solution:
          (this.sortedValues[this.length / 2 - 1] +
            this.sortedValues[this.length / 2 + 1 - 1]) /
          2,
      };

    return { solution: this.sortedValues[Math.floor(this.length / 2)] };
  }
}
