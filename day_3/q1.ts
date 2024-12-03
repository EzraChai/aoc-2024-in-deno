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

const regex = /mul\(([0-9999]+),([0-9999]+)\)/g;
text.matchAll(regex)?.forEach((item) => {
  const mul = +item[1] * +item[2];
  sum += mul;
});

console.log(sum);
