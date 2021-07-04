import axios from "axios"
import seed from "seed-random";

const getRandomQuote = async () => {
    let dt = new Date()
    let randomSeed = dt.getDay() + dt.getMonth() + dt.getHours();
    let generator = new seed(randomSeed);
    let randomNumber = generator();

    const quotes = await axios.get("https://type.fit/api/quotes");
    let randomIdx = Math.floor(randomNumber * quotes.data.length)

    return quotes.data[randomIdx];
}

export const quotesUtils = {
    getRandomQuote: getRandomQuote
}