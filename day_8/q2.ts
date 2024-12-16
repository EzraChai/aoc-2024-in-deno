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

// console.log(text);
const arr = new Array<Array<string>>();
const ar = text.split("\n");
ar.forEach((ar2, index) => {
  arr[index] = ar2.split("");
});

const exp = /\w/g;
for (let y = 0; y < arr.length; y++) {
  for (let x = 0; x < arr[y].length; x++) {
    const text = arr[y][x].match(exp);
    if (text) {
      const char = text[0];

      for (let a = 0; a < arr.length; a++) {
        for (let b = 0; b < arr[a].length; b++) {
          if (char === arr[a][b] && a != y && b != x) {
            const length = x - b;
            const height = y - a;
            let positionX = 0;
            let positionY = 0;

            let multiplier = 1;
            while (true) {
              positionX = b - multiplier * length;
              positionY = a - multiplier * height;

              if (
                positionX >= arr[a].length ||
                positionY >= arr.length ||
                positionX < 0 ||
                positionY < 0
              ) {
                break;
              }

              if (arr[positionY][positionX].match(exp)) {
                // sum++;
              } else {
                arr[positionY][positionX] = "#";
              }
              multiplier++;
            }
          }
        }
      }
    }
  }
}
for (let i = 0; i < arr.length; i++) {
  const newArr = arr[i].join("");
  console.log(newArr);
}

for (let indexY = 0; indexY < arr.length; indexY++) {
  for (let indexX = 0; indexX < arr[indexY].length; indexX++) {
    if (arr[indexY][indexX].match(exp) || arr[indexY][indexX] === "#") {
      sum++;
    }
  }
}

console.log(sum);
