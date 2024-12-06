let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

const position = new Array<Array<string>>();

text.split("\n").forEach((line, i) => {
  const arr = line.split("");
  position[i] = arr;
});

let xPoint = 0,
  yPoint = 0;

position.forEach((arr, i) => {
  arr.forEach((char, j) => {
    if (char === "^") {
      yPoint = i;
      xPoint = j;
    }
  });
});

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let currentDirection: Direction = Direction.Up;

while (
  xPoint < position[0].length &&
  yPoint < position.length &&
  xPoint >= 0 &&
  yPoint >= 0
) {
  // console.clear();
  position.forEach((arr) => console.log(arr.join("")));

  switch (Number(currentDirection)) {
    case Direction.Up:
      if (yPoint > 0 && position[yPoint - 1][xPoint] === "#") {
        currentDirection = Direction.Right;
        break;
      }
      position[yPoint][xPoint] = "X";
      yPoint--;
      break;

    case Direction.Down:
      if (
        yPoint < position.length - 1 &&
        position[yPoint + 1][xPoint] === "#"
      ) {
        currentDirection = Direction.Left;
        break;
      }
      position[yPoint][xPoint] = "X";
      yPoint++;

      break;

    case Direction.Left:
      if (xPoint > 0 && position[yPoint][xPoint - 1] === "#") {
        currentDirection = Direction.Up;
        break;
      }
      position[yPoint][xPoint] = "X";
      xPoint--;
      break;

    case Direction.Right:
      if (
        xPoint < position[0].length - 1 &&
        position[yPoint][xPoint + 1] === "#"
      ) {
        currentDirection = Direction.Down;
        break;
      }
      position[yPoint][xPoint] = "X";
      xPoint++;
      break;
  }
}

let sum = 0;
position.forEach((arr) => arr.map((char) => char === "X" && sum++));

console.log(sum);
