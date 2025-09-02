import os
from dotenv import load_dotenv
import re
import json
import praw
import pandas as pd
from wordcloud import WordCloud, STOPWORDS

load_dotenv()

# --- Reddit client ---
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

# --- Fetch comments ---
def fetch_reddit_comments(subreddit="blackpink", post_limit=20, comment_limit=100):
    comments_data = []
    for submission in reddit.subreddit(subreddit).new(limit=post_limit):
        submission.comments.replace_more(limit=0)
        for comment in submission.comments.list()[:comment_limit]:
            comments_data.append({
                "comment_body": comment.body
            })
    return comments_data

    # --- Clean text ---
def clean_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# --- Generate word cloud ---
def generate_wordcloud(df, output_path="wordcloud.png"):
    all_text = " ".join(df["clean_text"].tolist())
    
    stopwords = set(STOPWORDS) | {
        "think","need","seems","seem","now","feel","blackpink","deleted","removed","edit",
        "comment","post","upvote","downvote","reddit","thread","sub","mods","look"
    }
    
    wordcloud = WordCloud(
        width=800,
        height=400,
        background_color="white",
        stopwords=stopwords,
        collocations=True
    ).generate(all_text) 
    
    output_path = os.path.join("public", "wordcloud.png") # --- define the path to save the word cloud
    wordcloud.to_file(output_path) # --- basically public/wordcloud.png
    return output_path

# --- Entrypoint ---
if __name__ == "__main__":
    comments = fetch_reddit_comments()
    df = pd.DataFrame(comments)

    if df.empty:
        print(json.dumps({"error": "No comments found"}))
        exit()

    df['clean_text'] = df['comment_body'].apply(clean_text)
    image_path = generate_wordcloud(df)