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

let dotCount = 0;
arr2
  .join("")
  .matchAll(/\./g)
  .forEach(() => dotCount++);
let lastIndex = arr2.length - 1;
for (let i = 0; i < dotCount; i++) {
  const lastVal = arr2[lastIndex];
  const firstIndex = arr2.indexOf(".");
  arr2[firstIndex] = lastVal;
  arr2[lastIndex] = ".";
  lastIndex--;
}

const indexDot = arr2.indexOf(".");
arr2.splice(indexDot);

let totalSum = 0;

for (let i = 0; i < arr2.length; i++) {
  totalSum += i * +arr2[i];
}
console.log(arr2.join(""));
console.log(totalSum);
