import React, { useEffect } from "react";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";

function News() {
  const [articles, setArticles] = useState([]);
  const [randomArticle, setRandomArticle] = useState([]);
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const handleReload = (e) => {
    e.preventDefault();
    setRandomArticle(articles[Math.floor(Math.random() * articles.length)]);
  };

  function getNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const articlesData = data.articles;
        setArticles(articlesData);
        setRandomArticle(
          articlesData[Math.floor(Math.random() * articlesData.length)]
        );
      });
  }
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="news_wrap">
      <div>
        <span>오늘의 news</span>
        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer">
          <span className="title">{randomArticle.title}</span>
        </a>
        <button onClick={handleReload}>
          <IoRefresh />
        </button>
      </div>
    </div>
  );
}

export default News;
