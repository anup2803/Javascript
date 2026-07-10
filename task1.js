// console.log("Time");
// function printCurrentDateTime() {
//   const date = new Date();
//   console.log(date);
// }

// function startTimer(interval, durations, callback) {
//   const timer = setInterval(() => {
//     callback();
//   }, interval);

//   setTimeout(() => {
//     clearInterval(timer);
//     console.log("Operation Finished");
//   }, durations);
// }

// startTimer(1000, 5000, printCurrentDateTime);

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
