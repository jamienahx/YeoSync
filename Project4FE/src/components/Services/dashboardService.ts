const fetchWordCloud = async () => {
try {
    const response = await fetch("http://localhost:3000/wordcloud");
    if(!response.ok) {
        throw new Error("Failed to fetch wordcloud");
    }
  const data = await response.json();
     // builds the url: http://localhost:3000/wordcloud.png
    return `http://localhost:3000${data.wordcloud_image}`;
} catch (err) {
    console.error("Error fetching wordcloud:", err);
    throw err;
}

}

const fetchSentiment = async () => {
  try {
    const response = await fetch("http://localhost:3000/sentiment");
    if (!response.ok) {
      throw new Error("Failed to fetch sentiment");
    }
    const data = await response.json();
    return data; // { Positive: X, Neutral: Y, Negative: Z }
  } catch (err) {
    console.error("Error fetching sentiment:", err);
    throw err;
  }
};

export {fetchWordCloud, fetchSentiment}