import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 0,
            totalResults: 0
        }
        // console.log("constr");
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f6b57ac08e0b472cafda3a84f4c4a122&page=${this.state.page+1}&pageSize=15`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
       
        this.setState(
            { articles: parsedData.articles, totalResults: parsedData.totalResults, page: 1 }
            
        )
        console.log(this.state.page)
    }
    handlePrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f6b57ac08e0b472cafda3a84f4c4a122&page=${this.state.page+1}&pageSize=15`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        // console.log(this.state.page)
        this.setState(
            {
                articles: parsedData.articles,
                page: this.state.page - 1
            }
        )
        console.log(this.state.page)
    }
    handleNext = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f6b57ac08e0b472cafda3a84f4c4a122&page=${this.state.page+1}&pageSize=15`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        // console.log(this.state.page)
        this.setState(
            {
                articles: parsedData.articles,
                page: this.state.page + 1
            }
        )
        console.log(this.state.page)
    }
    render() {
        
        return <div className='container my-3'>
            <h1 className='text-center'>NewsPost-Top Headlines</h1>
            <div className='row'>
                {this.state.articles.map((element) => {
                    return (
                        <div className='col-md-4 my-3' key={element.url}>
                            <NewsItem title={element.title} description={element.description ? element.description.slice(0, 45) : "description not available"} imageUrl={element.urlToImage ? element.urlToImage : "https://user-images.githubusercontent.com/88069082/149673405-b47f71c1-0777-4038-9247-5b0c9d166f22.jpg"} newsUrl={element.url} />
                        </div>)
                })}

            </div>
            <div className='container d-flex justify-content-between my-3'>
                <button type="button" className="btn btn-primary" onClick={this.handlePrev} disabled={this.state.page === 1}>&#8592; Previous</button>
                <button type="button" className="btn btn-primary" onClick={this.handleNext} disabled={Math.ceil(this.state.totalResults / 15) === this.state.page}>Next &#8594;</button>
            </div>
        </div>;
    }
}

export default News;
