const getTwentyFourHrTime = () => {
    var today = new Date()
    var twentyFourHrTime = today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0")

    return twentyFourHrTime;
}

const getTwelveHrTime = () => {
  var today = new Date();
  var hours = String(parseInt(today.getHours(), 10) % 12)

  var twentyFourHrTime =
    hours + ":" + String(today.getMinutes()).padStart(2, "0");

  return twentyFourHrTime;
};

export const clockUtils = {
    getTwentyFourHrTime: getTwentyFourHrTime,
    getTwelveHrTime: getTwelveHrTime
}