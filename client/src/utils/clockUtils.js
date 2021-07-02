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

export const clockUtils = {
    getTwentyFourHrTime: getTwentyFourHrTime,
    getTwelveHrTime: getTwelveHrTime
}