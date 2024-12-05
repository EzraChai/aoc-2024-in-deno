let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}
const part1 = text.split("\n\n")[0].split("\n");
const part2 = text.split("\n\n")[1];

let sum = 0;

const rules = new Array<Array<number>>();
part1.forEach((line, index) => {
  const [a, b] = line.split("|");
  rules[index] = [+a, +b];
});
// console.log(rules);

part2.split("\n").forEach((line) => {
  let isRightOrder = true;
  const numLine = line.split(",").map((num) => +num);

  for (let i = 0; i < numLine.length - 1; i++) {
    const rulesSelectedSet = new Set<number>();
    // console.log(numLine[i]);

    rules.forEach((rule) => {
      if (
        numLine[i] === rule[0] &&
        numLine.find((element, index) => element === rule[1] && index > i)
      ) {
        rulesSelectedSet.add(rule[1]);
      }
    });

    // console.log(rulesSelectedSet);
    if (rulesSelectedSet.size !== numLine.length - i - 1) {
      isRightOrder = false;
      break;
    }

    for (let j = i + 1; j < numLine.length; j++) {
      if (rulesSelectedSet.has(numLine[j])) {
        isRightOrder = true;
      } else {
        isRightOrder = false;
        break;
      }
    }

    // console.log(rulesSelectedSet);
  }
  if (!isRightOrder) {
    const correctOrder = new Array<number>(numLine.length);
    for (let i = 0; i <= numLine.length - 1; i++) {
      const rulesSelectedSet = new Set<number>();
      // console.log(numLine[i]);

      rules.forEach((rule) => {
        if (
          numLine[i] === rule[0] &&
          numLine.find((element) => element === rule[1])
        ) {
          rulesSelectedSet.add(rule[1]);
        }
      });

      correctOrder[numLine.length - 1 - rulesSelectedSet.size] = numLine[i];
    }
    console.log(correctOrder);
    const mid = (correctOrder.length - 1) / 2;
    sum += correctOrder[mid];
  }
});

console.log(sum);
