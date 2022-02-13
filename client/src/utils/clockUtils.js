const getTwentyFourHrTime = () => {
    var today = new Date()
    var twentyFourHrTime = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0")

    return twentyFourHrTime;
}

const getTwelveHrTime = () => {
  var today = new Date();
  var hours = String(parseInt(today.getHours(), 10) % 12)

  var twentyFourHrTime = String(hours).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0");

  return twentyFourHrTime;
};

const getDateMonth = () => {
  let date = new Date();
  return date.toLocaleString("default", {day: "numeric", month: "short"});
}

const getDateMonthYear = () => {
  let date = new Date();
  return date.toLocaleString("default", {day: "numeric", month: "short", year: "numeric"});
}

export const clockUtils = {
    getTwentyFourHrTime: getTwentyFourHrTime,
    getTwelveHrTime: getTwelveHrTime,
    getDateMonth: getDateMonth,
    getDateMonthYear: getDateMonthYear
}