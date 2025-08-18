import os
from dotenv import load_dotenv
import re
import json
import praw
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from textblob import TextBlob

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)


def fetch_reddit_comments(subreddit="blackpink", post_limit=20, comment_limit=100):
    comments_data = []
    for submission in reddit.subreddit(subreddit).new(limit=post_limit):
        submission.comments.replace_more(limit=0)
        for comment in submission.comments.list()[:comment_limit]:
            comments_data.append({
                "comment_body": comment.body,
                "score": comment.score,
                "created": comment.created_utc
            })
    return comments_data


def clean_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def get_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    return pd.Series([polarity, subjectivity])


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
    comments = fetch_reddit_comments()
    df = pd.DataFrame(comments)

    if df.empty:
        print(json.dumps({"error": "No comments found"}))
        exit()

    df['clean_text'] = df['comment_body'].apply(clean_text)
    df[['polarity', 'subjectivity']] = df['clean_text'].apply(get_sentiment)
    df['sentiment'] = df['polarity'].apply(classify_sentiment)

    summary = summarize_sentiment(df)
    print(json.dumps(summary))
