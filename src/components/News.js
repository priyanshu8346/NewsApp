import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const updateNews = async (props) => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);

    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
    console.log(parsedData);
  };

  useEffect(() => {
    updateNews(props);
    document.title = `${props.category}-NewsPost`;
  },[]);

  const increment = () => {
    setPage(prevPage => prevPage+1)

  };

  const fetchMoreData = async () => {
   await increment();
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setLoading(false);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        style={{
          margin: "9vh 0 2vh 0",
          textAlign: "center",
          textShadow: "3px 3px 5px #622828",
        }}
      >
        PocketNews-Top Headlines{" "}
        {props.category[0].toUpperCase() + props.category.slice(1)}
      </h1>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 45) + "..."
                        : "description not available"
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.91-cdn.com/hub/wp-content/uploads/2022/01/iphone-13-mini-image-feat.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    sourceName={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProptypes = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
