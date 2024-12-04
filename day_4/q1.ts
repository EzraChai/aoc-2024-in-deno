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
    if (item2.match(/X/)) {
      if (
        x >= 3 &&
        xmasArr[y][x - 1].match(/M/) &&
        xmasArr[y][x - 2].match(/A/) &&
        xmasArr[y][x - 3].match(/S/)
      ) {
        sum++;
      }
      if (
        x + 3 < xmasArr[y].length &&
        xmasArr[y][x + 1].match(/M/) &&
        xmasArr[y][x + 2].match(/A/) &&
        xmasArr[y][x + 3].match(/S/)
      ) {
        sum++;
      }
      if (
        y >= 3 &&
        xmasArr[y - 1][x].match(/M/) &&
        xmasArr[y - 2][x].match(/A/) &&
        xmasArr[y - 3][x].match(/S/)
      ) {
        sum++;
      }
      if (
        y + 3 < xmasArr.length &&
        xmasArr[y + 1][x].match(/M/) &&
        xmasArr[y + 2][x].match(/A/) &&
        xmasArr[y + 3][x].match(/S/)
      ) {
        sum++;
      }
      if (
        y >= 3 &&
        x >= 3 &&
        xmasArr[y - 1][x - 1].match(/M/) &&
        xmasArr[y - 2][x - 2].match(/A/) &&
        xmasArr[y - 3][x - 3].match(/S/)
      ) {
        sum++;
      }
      if (
        y >= 3 &&
        x + 3 < xmasArr[y].length &&
        xmasArr[y - 1][x + 1].match(/M/) &&
        xmasArr[y - 2][x + 2].match(/A/) &&
        xmasArr[y - 3][x + 3].match(/S/)
      ) {
        sum++;
      }
      if (
        y + 3 < xmasArr.length &&
        x >= 3 &&
        xmasArr[y + 1][x - 1].match(/M/) &&
        xmasArr[y + 2][x - 2].match(/A/) &&
        xmasArr[y + 3][x - 3].match(/S/)
      ) {
        sum++;
      }
      if (
        y + 3 < xmasArr.length &&
        x + 3 < xmasArr[y].length &&
        xmasArr[y + 1][x + 1].match(/M/) &&
        xmasArr[y + 2][x + 2].match(/A/) &&
        xmasArr[y + 3][x + 3].match(/S/)
      ) {
        sum++;
      }
    }
  });
});

console.log(sum);
