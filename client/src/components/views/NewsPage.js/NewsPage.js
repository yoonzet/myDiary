import React, { useEffect, useState } from "react";
import MainLayout from "../../mainLayout/MainLayout";
import Masonry from "react-masonry-css";

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  function getNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const articlesData = data.articles;
        setArticles(articlesData);
        console.log(data);
      });
  }

  useEffect(() => {
    getNews();
  }, []);
  return (
    <MainLayout>
      <div className="innerFrame">
        <div className="news_wrap">
          <ul>
            <Masonry
              columns={4}
              spacing={2}
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <li className="firstList">
                <h1>오늘의 News</h1>
              </li>
              {articles.map((article) => (
                <li>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={article.urlToImage} alt="" />
                    <p>{article.title}</p>
                  </a>
                </li>
              ))}
            </Masonry>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default NewsPage;
