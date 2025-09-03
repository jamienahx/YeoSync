#!/usr/bin/env python
# coding: utf-8

import os
import sys
from dotenv import load_dotenv
import re
import json
import praw
import pandas as pd
from textblob import TextBlob

# Load environment variables
load_dotenv()

# Initialize Reddit API
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)

def fetch_reddit_comments_query(query, post_limit=20, comment_limit=100):
    comments_data = []
    for submission in reddit.subreddit("blackpink").search(
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


def clean_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def get_sentiment(text):
    blob = TextBlob(text)
    return pd.Series([blob.sentiment.polarity, blob.sentiment.subjectivity])

def classify_sentiment(score):
    if score >= 0.05:
        return 'Positive'
    elif score <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'

def summarize_sentiment(df):
    counts = df['sentiment'].value_counts().to_dict()
    return {
        "Positive": counts.get("Positive", 0),
        "Neutral": counts.get("Neutral", 0),
        "Negative": counts.get("Negative", 0)
    }

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
    df[['polarity', 'subjectivity']] = df['clean_text'].apply(get_sentiment)
    df['sentiment'] = df['polarity'].apply(classify_sentiment)

    summary = summarize_sentiment(df)
    print(json.dumps(summary))
