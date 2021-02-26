const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
const futureDate = new Date(tempYear,tempMonth,tempDay+10,23,59,0,0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const secs = futureDate.getSeconds();
const millsec = futureDate.getMilliseconds();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month =months[month];

const day = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hours}:${minutes}:0${secs}:0${millsec}pm`;

const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime-today;

  //1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1day = 24hr

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60 * 1000;

  const days = Math.floor(t/oneDay);

  let hourss = (t%oneDay)/oneHour
  hourss = Math.floor(hourss);

  let minutes = (t % oneHour) / oneMinute
  minutes = Math.floor(minutes);

  let secs = (t % oneMinute) / 1000
  secs = Math.floor(secs);

  let millsec = (t % 1000)
  millsec = Math.floor(millsec);

  const values = [days,hourss,minutes,secs,millsec];

  function format(itemz) {
    if (itemz < 10) {
      return (itemz = `0${itemz}`);
    }
    return itemz;
  }

  items.forEach((item,index)=>{
    item.innerHTML = format(values[index]);
  });

  if (t<0) {
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class="expired"> Sorry you are late for the offer </h4>`
  }
}
let countDown = setInterval(getRemainingTime,1);
getRemainingTime();
