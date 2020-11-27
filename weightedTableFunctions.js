export function rollRandomEntryFrom(weightedTable) {
  if (!Array.isArray(weightedTable)) {
    throw new Error(
      `weightedTable must be an array of weighted Entries, recieved ${typeof weightedTable}`
    );
  }

  const sumOfWeights = weightedTable.reduce(accWeightedTableSum, 0);

  if (sumOfWeights === 0) {
    throw new Error("Sum of Weights in Weighted Table cannot be 0");
  }

  let idx = 0;
  let roll = Math.random();
  let sum = 0;

  while (idx < weightedTable.length) {
    const entry = weightedTable[idx];
    sum += entry[1] / sumOfWeights;

    if (roll <= sum) {
      return entry[0];
    }

    idx++;
  }

  return somethingBrokeResponse;
}

function accWeightedTableSum(acc, entry, i) {
  if (!Array.isArray(entry) || entry.length !== 2) {
    throw new Error(
      `Weighted table entry #${i} is not an array of exactly two entries:
      ${JSON.stringify(entry)}
      `
    );
  }

  if (typeof entry[1] !== "number") {
    throw new Error(
      `Entry #${i} does not have a 'number' type as the entry[1]`
    );
  }

  return acc + entry[1];
}
/** Something went wrong if you see this */
const somethingBrokeResponse = "idk how to respond to that...";
