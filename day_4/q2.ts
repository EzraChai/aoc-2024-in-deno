let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}
let sum = 0;

const xmasArr = new Array<Array<string>>();
text.split("\n").forEach((item, index) => {
  xmasArr[index] = item.split("");
});

// [2][3] y,x
xmasArr.forEach((_, y) => {
  xmasArr[y].forEach((item2, x) => {
    if (item2.match(/A/)) {
      if (
        y >= 1 &&
        x >= 1 &&
        y + 1 < xmasArr.length &&
        x + 1 < xmasArr[y].length &&
        xmasArr[y - 1][x - 1].match(/M/) &&
        xmasArr[y + 1][x - 1].match(/M/) &&
        xmasArr[y - 1][x + 1].match(/S/) &&
        xmasArr[y + 1][x + 1].match(/S/)
      ) {
        sum++;
      }
      if (
        y >= 1 &&
        x >= 1 &&
        y + 1 < xmasArr.length &&
        x + 1 < xmasArr[y].length &&
        xmasArr[y - 1][x - 1].match(/S/) &&
        xmasArr[y + 1][x - 1].match(/S/) &&
        xmasArr[y - 1][x + 1].match(/M/) &&
        xmasArr[y + 1][x + 1].match(/M/)
      ) {
        sum++;
      }
      if (
        y >= 1 &&
        x >= 1 &&
        y + 1 < xmasArr.length &&
        x + 1 < xmasArr[y].length &&
        xmasArr[y - 1][x - 1].match(/M/) &&
        xmasArr[y + 1][x - 1].match(/S/) &&
        xmasArr[y - 1][x + 1].match(/M/) &&
        xmasArr[y + 1][x + 1].match(/S/)
      ) {
        sum++;
      }
      if (
        y >= 1 &&
        x >= 1 &&
        y + 1 < xmasArr.length &&
        x + 1 < xmasArr[y].length &&
        xmasArr[y - 1][x - 1].match(/S/) &&
        xmasArr[y + 1][x - 1].match(/M/) &&
        xmasArr[y - 1][x + 1].match(/S/) &&
        xmasArr[y + 1][x + 1].match(/M/)
      ) {
        sum++;
      }
    }
  });
});

console.log(sum);
