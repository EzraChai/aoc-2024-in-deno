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

text.split("\n").forEach((line,index) => {
  const lineArr = line.split("   ");
    firstRow[index] = +lineArr[0];
    secondRow[index] = +lineArr[1];
})

const arr = [];
for(let i = 0; i < firstRow.length; i++){
    let total = 0;
    secondRow.forEach((element) => {
        if(element == firstRow[i]){
            total++;
        }
    })
    arr[i] = [firstRow[i], total]
}

let similarityScore  = 0;

for(let i = 0; i < arr.length; i++){
    similarityScore += arr[i][0] * arr[i][1];
}

console.log(similarityScore)
