let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

let counter = 0;
const arr1 = text.split("");

const builder = new Array<string>();
console.log(arr1);
for (let i = 0; i < arr1.length; i += 2) {
  const idNum = +arr1[i];
  for (let num = 0; num < idNum; num++) {
    builder.push(counter.toString());
  }
  const space = +arr1[i + 1];
  for (let num = 0; num < space; num++) {
    builder.push(".");
  }
  counter++;
}

const arr2 = builder;

// console.log(arr2);
for (let num = counter - 1; num > 0; num--) {
  // console.log("NUM", num);

  const lastNumIndex = arr2.findLastIndex((el) => +el === num);
  // console.log("LAST: ", lastNumIndex);
  const lastNonNumIndex = arr2.findLastIndex(
    (el, index) => +el !== num && index < lastNumIndex,
  );
  // console.log("NON: ", lastNonNumIndex);
  const numLength = lastNumIndex - lastNonNumIndex;
  // console.log("NUM LENGTH", numLength);

  let dotCount = 0;
  let lastDotIndex = -1;

  for (let i = 0; i < arr2.length && i < lastNonNumIndex + 1; i++) {
    if (arr2[i] === ".") {
      dotCount++;
      lastDotIndex = i;
      // console.log("dotCount", dotCount);
    }
    if (dotCount >= numLength) {
      for (let i = 0; i < numLength; i++) {
        arr2[lastDotIndex - i] = num.toString();
        arr2[lastNonNumIndex + 1 + i] = ".";
      }
      // console.log(arr2.join(""));
      break;
    }
    if (arr2[i] !== "." && dotCount != 0) {
      dotCount = 0;
      lastDotIndex = -1;
    }
  }
}

console.log(arr2.join(""));

let totalSum = 0;

for (let i = 0; i < arr2.length; i++) {
  if (arr2[i] === ".") {
    continue;
  }
  totalSum += i * +arr2[i];
}
console.log(totalSum);
