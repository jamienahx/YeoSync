#!/usr/bin/env python
# coding: utf-8

import os
import sys
import re
import json
from dotenv import load_dotenv
import praw
import pandas as pd
from wordcloud import WordCloud, STOPWORDS

# Load environment variables
load_dotenv()

# Initialize Reddit API
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

# --- Fetch comments for a given query ---
def fetch_reddit_comments_query(query, subreddit="blackpink", post_limit=20, comment_limit=100):
    comments_data = []
    for submission in reddit.subreddit(subreddit).search(
        query,
        sort="new",
        time_filter="all",
        limit=post_limit
    ):
        submission.comments.replace_more(limit=0)
        for comment in submission.comments.list()[:comment_limit]:
            comments_data.append({
                "comment_body": comment.body,
            })
    return comments_data

# --- Clean text ---
def clean_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# --- Generate word cloud ---
def generate_wordcloud(df, member, output_dir="public"):
    all_text = " ".join(df["clean_text"].tolist())

    stopwords = set(STOPWORDS) | {
       "think", "really","seem","now","feel","blackpink","deleted","removed","edit",
        "comment","post","upvote","downvote","reddit","thread","sub","mods"
    }

    wordcloud = WordCloud(
        width=800,
        height=400,
        background_color="white",
        stopwords=stopwords,
        collocations=True
    ).generate(all_text)

    # Ensure output directory exists

    output_path = os.path.join(output_dir, f"{member.lower()}_wordcloud.png")
    wordcloud.to_file(output_path)
    return output_path

# --- Entrypoint ---
if __name__ == "__main__":
    # Check if member argument provided
    member = sys.argv[1] if len(sys.argv) > 1 else None

    if not member:
        print(json.dumps({"error": "No member specified"}))
        exit()

    query = f"Blackpink {member}"
    comments = fetch_reddit_comments_query(query)

    df = pd.DataFrame(comments)
    if df.empty:
        print(json.dumps({"error": f"No comments found for {member}"}))
        exit()

    df['clean_text'] = df['comment_body'].apply(clean_text)
    image_path = generate_wordcloud(df, member)


