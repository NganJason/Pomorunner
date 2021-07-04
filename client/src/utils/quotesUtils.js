import axios from "axios";
import seed from "seed-random";

const getRandomQuote = async () => {
  let dt = new Date();
  let randomSeed = dt.getDay() + dt.getMonth() + dt.getHours() + dt.getMinutes();
  let generator = new seed(randomSeed);
  let randomNumber = generator();

  const res = await axios.get(
    "https://api.quotable.io/quotes?maxLength=100&tags=love|happiness|inspirational|faith|friendship|nature|famous-quotes&limit=2000"
  );
  let quotes = res.data.results;
  let randomIdx = Math.floor(randomNumber * quotes.length);

  return quotes[randomIdx].content;
};

export const quotesUtils = {
  getRandomQuote: getRandomQuote,
};
