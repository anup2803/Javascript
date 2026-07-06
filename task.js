console.log("Tech Conference");

//hosting

main();

function main() {
  console.log("hello");
}

// TDZ
try {
  console.log(x);
  let x = 5;
} catch (error) {
  console.log(error);
}

//Array & Object
const speaker = [
  {
    name: "Speaker 1",
    fee: 800,
  },
  {
    name: "Speaker 2",
    fee: 700,
  },
  {
    name: "Speaker 3",
    fee: 900,
  },
  {
    name: "Speaker 3",
    fee: 900,
  },
];

//Spread Operator adding the vip speaker
const vipSpeaker = {
  name: "VIP Speaker",
  fee: 1500,
};

const allSpeaker = [...speaker, vipSpeaker];

console.log(allSpeaker);

//calculate the functions for all the fee sum

const fee = allSpeaker.map((m) => m.fee);

console.log(fee);

function calculateSum(...fee) {
  let total = 0;
  for (const amount of fee) {
    total = total + amount;
  }

  return total;
}
//Or used reduce
// reduce
const calcuateSumByReduce = (...fee) => {
  return fee.reduce((total, amount) => {
    return (total += amount);
  }, 0);
};

//output in the clean and 2 decimal only
console.log(`Total Fee : ${calculateSum(...fee).toFixed(2)}`);
console.log(`Total Fee : ${calcuateSumByReduce(...fee).toFixed(2)}`);

//calcuate how many date is left for the conference

const date = new Date();
console.log(date);

const conferenceDate = new Date("2026-07-18");

const differenceDate = conferenceDate - date;

console.log(differenceDate);

//converting the date into days
// 1000 milliseconds = 1 second
// 60 seconds = 1 minute
// 60 minutes = 1 hour
// 24 hours = 1 day

const leftDay = differenceDate / (1000 * 60 * 60 * 24);
console.log(leftDay);

//converting the day into actual day using ceil
const actualDay = Math.ceil(leftDay);
console.log(actualDay);

//Destructing the speakers

const [speaker1, speaker2] = allSpeaker;
console.log(nameHelper(speaker1.name));
console.log(nameHelper(speaker2.name));

//DRY
function nameHelper(name) {
  return name.toUpperCase();
}

//Debugging using console.table()

console.table(allSpeaker);
console.table(speaker);
