let text = "";
using file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size =fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

const firstRow = new Array<number>();
const secondRow = new Array<number>();

text.split("\n").forEach((line, index) => {
  const lineArr = line.split("   ");
  firstRow[index] = +lineArr[0];
  secondRow[index] = +lineArr[1];
})

const firstRowSorted: Array<number> = firstRow.toSorted();
const secondRowSorted: Array<number> = secondRow.toSorted();

let sum = 0;
for(let i = 0; i < firstRowSorted.length; i++){

  if(secondRowSorted[i] > firstRowSorted[i]){
    sum += secondRowSorted[i] - firstRowSorted[i];
  }else {
    sum += firstRowSorted[i] - secondRowSorted[i];
  }
}

console.log(sum)