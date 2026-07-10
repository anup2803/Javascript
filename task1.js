console.log("Time");

function printCurrentDateTime() {
  const date = new Date();
  console.log(date);
}

function startTimer(interval, callback) {
  setInterval(() => {
    callback();
  }, interval);
}

startTimer(1000, printCurrentDateTime);
