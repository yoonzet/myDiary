import React, { useEffect } from "react";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { NavLink } from "react-router-dom";

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
    <div className="home_news_wrap">
      <div>
        <NavLink to="/news">
          <span>오늘의 news</span>
        </NavLink>
        <a href={randomArticle.url} target="_blank" rel="noopener noreferrer">
          <p className="title">{randomArticle.title}</p>
        </a>
        <button onClick={handleReload}>
          <IoRefresh />
        </button>
      </div>
    </div>
  );
}

export default News;
