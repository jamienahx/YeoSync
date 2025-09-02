const fetchMemberWordCloud = async (memberName: string) => {
try {
    const response = await fetch(`http://localhost:3000/memberwordcloud?member=${memberName}`);
    if(!response.ok) {
        throw new Error("Failed to member fetch wordcloud");
    }
  const data = await response.json();
     // builds the url: http://localhost:3000/wordcloud.png
    return `http://localhost:3000${data.wordcloud_image}`;
} catch (err) {
    console.error("Error fetching member wordcloud:", err);
    throw err;
}

}

export {fetchMemberWordCloud}