let text = "";
const file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

const arr = text.split("\n");
const trails = new Array<Array<number>>();
arr.forEach((element, index) => {
  trails[index] = element.split("").map((num) => +num);
});

/*
[[1,2], [2,1]]
*/
const zeroSpot = new Array<Array<number>>();
arr.forEach((el, index) => {
  el.matchAll(/0/g).forEach((ele) => {
    console.log(ele.index, index);
    zeroSpot.push([index, ele.index]);
  });
});

const nineSpot = new Array<Array<number>>();
arr.forEach((el, index) => {
  el.matchAll(/9/g).forEach((ele) => {
    console.log(ele.index, index);
    zeroSpot.push([index, ele.index]);
  });
});

zeroSpot.forEach((el) => {
  let counter = 0;
  let indexY = el[0];
  let indexX = el[1];
  while (counter < 10) {
    if (
      indexX >= 0 &&
      indexX < trails[indexY].length - 1 &&
      trails[indexY][indexX + 1] === counter + 1
    ) {
      indexX++;
      counter++;
    }
    if (
      indexX > 0 &&
      indexX <= trails[indexY].length &&
      trails[indexY][indexX - 1] === counter + 1
    ) {
      indexX--;
      counter++;
    }
    if (
      indexY >= 0 &&
      indexY < trails.length - 1 &&
      trails[indexY + 1][indexX] === counter + 1
    ) {
      indexY++;
      counter++;
    }
    if (
      indexY > 0 &&
      indexY <= trails.length &&
      trails[indexY - 1][indexX] === counter + 1
    ) {
      indexY--;
      counter++;
    }
  }
  if (trails[indexY][indexX] === 9) {
    console.log("nice");
  }
  console.log(trails[indexY][indexX]);
});

// console.log(trails);
// console.log(zeroSpot);
