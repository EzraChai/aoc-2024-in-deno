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
text.split("\n").forEach((line) => {
  let isTrue = false;
  const ans = +line.split(":")[0];
  const listNum = line
    .split(":")[1]
    .trim()
    .split(" ")
    .map((num) => +num);

  let total = 0;

  const totalPossibilities = Math.pow(2, listNum.length - 1);

  // 11 + 6 * 16 + 20
  // for (int i = 1; i <totalPossibilities; i++){
  if (ans === total) {
    isTrue = true;
  }

  // +++
  // ++*
  // +*+

  // let combo = new Array<Array<string>>(totalPossibilities)
  let num = new Array<string>(totalPossibilities);
  let n1 = 0b000;
  for (let i = 0; i < totalPossibilities; i++) {
    num[i] = n1.toString(2).padStart(listNum.length - 1, "0");
    n1++;
  }

  let combo = new Array(totalPossibilities);

  num.forEach((element, index) => {
    combo[index] = element.replace(/1/g, "*").replace(/0/g, "+").split("");
  });

  for (let i = 0; i < combo.length; i++) {
    let total = listNum[0];
    const comboArr = combo[i];
    for (let j = 0; j < comboArr.length; j++) {
      if (comboArr[j] === "*") {
        total *= listNum[j + 1];
      } else if (comboArr[j] === "+") {
        total += listNum[j + 1];
      }
    }
    if (total === ans) {
      isTrue = true;
    }
  }

  if (isTrue) {
    sum += ans;
  }
});

console.log(sum);
