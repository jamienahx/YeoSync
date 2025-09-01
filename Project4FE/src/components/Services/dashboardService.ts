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

export {fetchWordCloud}