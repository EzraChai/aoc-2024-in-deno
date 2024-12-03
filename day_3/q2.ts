let text = "";
using file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

let sum = 0;

const regex = /mul\(([0-9999]+),([0-9999]+)\)|don't\(\)|do\(\)/g;

let doCondition = true;

text.matchAll(regex)?.forEach((item) => {
  if (item[0] === "don't()") {
    doCondition = false;
  } else if (item[0] === "do()") {
    doCondition = true;
  } else {
    if (doCondition === true) {
      const mul = +item[1] * +item[2];
      sum += mul;
    }
  }
});

console.log(sum);
