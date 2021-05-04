export default class Mode {
  constructor(sample) {
    this.values = sample;
    this.length = sample.length;
  }

  normalMode() {
    /// status of all different numbers and there quantities
    let status = [];

    // stores checked number so it not be checked again
    let checkedNumbers = [];

    // loop over all numbers
    for (let number of this.values) {
      // if number is checked skip the number
      if (checkedNumbers.includes(number)) continue;

      // add the the quantity of the number to the status array
      status.push({
        value: number,
        quantity: this.values.filter((num) => num == number).length,
      });

      // add number to the checked list
      checkedNumbers.push(number);
    }

    // sort the the status array from the biggest quantity to the lowest
    status.sort((a, b) => b.quantity - a.quantity);

    // if the biggest quantity in the sorted array is 1 then there are no mode
    if (status[0].quantity == 1) return "there are No Mode";

    // return all the numbers that has the same quantity as the biggest one
    return status.filter((stat) => stat.quantity == status[0].quantity);
  }
}
