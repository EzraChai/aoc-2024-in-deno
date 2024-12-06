let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
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

let currentDirection: Direction = Direction.Up;
let obstruction = 0;

while (
  xPoint < position[0].length &&
  yPoint < position.length &&
  xPoint >= 0 &&
  yPoint >= 0
) {
  switch (Number(currentDirection)) {
    case Direction.Up:
      if (yPoint > 0 && position[yPoint - 1][xPoint] === "#") {
        currentDirection = Direction.Right;
        break;
      }
      if (
        position[yPoint][xPoint] === "X" ||
        (yPoint > 0 && position[yPoint - 1][xPoint] === ".")
      ) {
        const cloneposition = JSON.parse(JSON.stringify(position));
        const clonexPoint = xPoint;
        const cloneyPoint = yPoint;
        const cloneCurrentDirection = currentDirection;

        testObstruction(
          cloneposition,
          clonexPoint,
          cloneyPoint,
          cloneCurrentDirection
        );
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
      if (
        position[yPoint][xPoint] === "X" ||
        (yPoint < position.length - 1 && position[yPoint + 1][xPoint] === ".")
      ) {
        const cloneposition = JSON.parse(JSON.stringify(position));
        const clonexPoint = xPoint;
        const cloneyPoint = yPoint;
        const cloneCurrentDirection = currentDirection;

        testObstruction(
          cloneposition,
          clonexPoint,
          cloneyPoint,
          cloneCurrentDirection
        );
      }
      position[yPoint][xPoint] = "X";
      yPoint++;

      break;

    case Direction.Left:
      if (xPoint > 0 && position[yPoint][xPoint - 1] === "#") {
        currentDirection = Direction.Up;
        break;
      }
      if (
        position[yPoint][xPoint] === "X" ||
        (xPoint > 0 && position[yPoint][xPoint - 1] === ".")
      ) {
        // console.log(position);
        const cloneposition = JSON.parse(JSON.stringify(position));
        const clonexPoint = xPoint;
        const cloneyPoint = yPoint;
        const cloneCurrentDirection = currentDirection;

        testObstruction(
          cloneposition,
          clonexPoint,
          cloneyPoint,
          cloneCurrentDirection
        );
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
      if (
        position[yPoint][xPoint] === "X" ||
        (xPoint < position[0].length - 1 &&
          position[yPoint][xPoint + 1] === ".")
      ) {
        const cloneposition = JSON.parse(JSON.stringify(position));
        const clonexPoint = xPoint;
        const cloneyPoint = yPoint;
        const cloneCurrentDirection = currentDirection;

        testObstruction(
          cloneposition,
          clonexPoint,
          cloneyPoint,
          cloneCurrentDirection
        );
      }
      position[yPoint][xPoint] = "X";
      xPoint++;
      break;
  }
}

let sum = 0;
position.forEach((arr) => arr.map((char) => char === "X" && sum++));

console.log(sum);
console.log(obstruction);

function testObstruction(
  pos: Array<Array<string>>,
  x: number,
  y: number,
  currentDirection2: Direction
): void {
  switch (Number(currentDirection2)) {
    case Direction.Up:
      pos[y - 1][x] = "O";
      currentDirection2 = Direction.Right;
      break;
    case Direction.Down:
      pos[y + 1][x] = "O";
      currentDirection2 = Direction.Left;
      break;
    case Direction.Left:
      pos[y][x - 1] = "O";
      currentDirection2 = Direction.Up;
      break;
    case Direction.Right:
      pos[y][x + 1] = "O";
      currentDirection2 = Direction.Down;
      break;
  }

  // console.log("");
  // pos.forEach((arr) => console.log(arr.join("")));
  // console.log(obstruction);

  let count = 0;
  while (
    x < pos[0].length &&
    y < pos.length &&
    x >= 0 &&
    y >= 0 &&
    count < 10000
  ) {
    // console.log(x, y);

    // console.log("");
    // pos.forEach((arr) => console.log(arr.join("")));

    switch (Number(currentDirection2)) {
      case Direction.Up:
        if (y > 0 && pos[y - 1][x] === "#") {
          currentDirection2 = Direction.Right;
          break;
        }
        if (y > 0 && pos[y - 1][x] === "O") {
          obstruction++;
          return;
        }
        pos[y][x] = "-";
        y--;
        count++;
        break;

      case Direction.Down:
        if (y < pos.length - 1 && pos[y + 1][x] === "#") {
          currentDirection2 = Direction.Left;
          break;
        }
        if (y < pos.length - 1 && pos[y + 1][x] === "O") {
          obstruction++;
          return;
        }

        pos[y][x] = "-";
        y++;
        count++;
        break;

      case Direction.Left:
        if (x > 0 && pos[y][x - 1] === "#") {
          currentDirection2 = Direction.Up;
          break;
        }
        if (x > 0 && pos[y][x - 1] === "O") {
          obstruction++;
          return;
        }

        pos[y][x] = "-";
        x--;
        count++;
        break;

      case Direction.Right:
        if (x < pos[0].length - 1 && pos[y][x + 1] === "#") {
          currentDirection2 = Direction.Down;
          break;
        }
        if (x < pos[0].length - 1 && pos[y][x + 1] === "O") {
          obstruction++;
          return;
        }

        pos[y][x] = "-";
        x++;
        count++;
        break;
    }
  }
  return;
}
