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
  let removeCount = 0;

  let order = "";
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      isDecreasing = false;
    }
    if (arr[i] < arr[i - 1]) {
      isIncreasing = false;
    }
  }

  if (isIncreasing) {
    order = "increasing";
  } else if (isDecreasing) {
    order = "descreasing";
  }

  if (order === "") {
    // 2 5 4 3 2 1
    let incount = 0;
    let decount = 0;
    let iindex = -1;
    let dindex = -1;

    for (let i = 1; i <= arr.length; i++) {
      if (arr[i] - arr[i - 1] > 0) {
        iindex = i;
        incount++;
      } else if (arr[i] - arr[i - 1] < 0) {
        dindex = i;
        decount++;
      }
    }

    if (
      incount < decount && incount === 1 &&
      (incount + decount) === arr.length - 1
    ) {
      if (arr[iindex - 1] < arr[iindex]) {
        arr.splice(iindex, 1);
      } else {
        arr.splice(iindex - 1, 1);
      }
      removeCount++;

      //  2 3 4 5 6 7 7 8
    } else if (
      incount > decount && decount === 1 &&
      (incount + decount) === arr.length - 1
    ) {
      if (arr[dindex - 1] < arr[dindex]) {
        arr.splice(dindex - 1, 1);
      } else {
        arr.splice(dindex, 1);
      }
      removeCount++;
    } else {
      safe = false;
    }

    incount = 0;
    decount = 0;

    for (let i = 1; i <= arr.length; i++) {
      if (arr[i] - arr[i - 1] > 0) {
        incount++;
      } else if (arr[i] - arr[i - 1] < 0) {
        decount++;
      }
    }

    if (
      incount >= 1 && decount >= 1 && (decount + incount) === arr.length - 1
    ) {
      safe = false;
    }

    if (safe) {
      console.log(arr);
    }
  }

  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] - arr[i - 1] > 3) {
      if (removeCount === 0) {
        arr.splice(i, 1);
        i = 0;
        removeCount++;
        continue;
      } else {
        // console.log(arr);

        safe = false;
        break;
      }
    } else if (arr[i] - arr[i - 1] === 0) {
      if (removeCount === 0) {
        arr.splice(i, 1);
        i = 0;
        removeCount++;
        continue;
      } else {
        // console.log(arr);
        safe = false;
        break;
      }
    } else if (arr[i - 1] - arr[i] > 3) {
      if (removeCount === 0) {
        arr.splice(i, 1);
        i = 0;
        removeCount++;
        continue;
      } else {
        // console.log(arr);
        safe = false;
        break;
      }
    }
  }

  if (safe) {
    console.log(arr);
    sumOfSafeReports++;
  }
});

console.log(sumOfSafeReports);
