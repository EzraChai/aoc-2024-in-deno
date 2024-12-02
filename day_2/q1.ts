let text = "";
using file = await Deno.openSync("./input.txt", { read: true });
const fileInfo = await file.stat();
if (fileInfo.isFile) {
  const size = fileInfo.size;
  const buf = new Uint8Array(size);
  file.readSync(buf);
  text = new TextDecoder().decode(buf);
}

let sumOfSafeReports = 0;

text.split("\n").forEach((line) => {
  let safe = true;
  const arr = line.split(" ").map((item) => +item);
  for (let i = 1; i < arr.length; i++) {
    if (i >= 2) {
      if (arr[i - 1] > arr[i] && arr[i - 2] < arr[i - 1]) {
        safe = false;
        break;
      } else if (arr[i - 1] < arr[i] && arr[i - 2] > arr[i - 1]) {
        safe = false;
        break;
      }
    }
    if (arr[i] - arr[i - 1] > 3) {
      safe = false;
      break;
    }
    if (arr[i] - arr[i - 1] === 0) {
      safe = false;
      break;
    }
    if (arr[i - 1] - arr[i] > 3) {
      safe = false;
      break;
    }
  }

  if (safe === true) {
    sumOfSafeReports++;
  }
});

console.log(sumOfSafeReports);
