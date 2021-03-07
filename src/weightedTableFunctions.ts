import { WeightedTable } from "./weightedTable";


export function rollRandomEntryFrom<T>(weightedTable: WeightedTable<T>): T {
  const sumOfWeights = weightedTable.reduce(accWeightedTableSum, 0);

  if (sumOfWeights === 0) {
    throw new Error("Sum of Weights in Weighted Table cannot be 0");
  }

  let idx = 0;
  let roll = Math.random();
  let sum = 0;

  while (idx < weightedTable.length) {
    const entry = weightedTable[idx];
    sum += entry[0] / sumOfWeights;

    if (roll <= sum) {
      return entry[1];
    }

    idx++;
  }
}

function accWeightedTableSum(acc, entry) {
  return acc + entry[0];
}