import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
// import PropTypes from 'prop-types'
export class News extends Component {

    capitalizeFirstLetter = (string)=>
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props)
    {
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1
        }

        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsNest`
    }

    async updateNews()
    {
        const xurl = `https://corsproxy.org/?https%3A%2F%2Fnewsapi.org%2Fv2%2Ftop-headlines%3Fcountry%3D${this.props.country}%26category%3D${this.props.category}%26apikey%3D2a96c43e0d6c4f1bb755112cc1d8488e%26page%3D${this.state.page}%26pageSize%3D${this.props.pageSize}`;
        
        // const xurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a96c43e0d6c4f1bb755112cc1d8488e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // https://corsproxy.org/?https%3A%2F%2Fnewsapi.org%2Fv2%2Ftop-headlines%3Fcountry%3D${this.props.country}%26category%3D${this.props.category}%26apikey%3D2a96c43e0d6c4f1bb755112cc1d8488e%26page%3D${this.state.page}%26pageSize%3D${this.props.pageSize}
        
        this.setState({loading:true})
        let data = await fetch(xurl);
        let parseData = await data.json();
        this.setState({
            articles:parseData.articles,
            totalResults: parseData.totalResults,
            loading:false
            
        }) 
    }
    async componentDidMount()  //------- this is life cycle method
    {
        
        // let xurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a96c43e0d6c4f1bb755112cc1d8488e&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(xurl);
        // let parseData = await data.json();
        // this.setState({
        //     articles:parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading:false
            
        // }) 
        this.updateNews()
    }

    handlePreviousClick=async()=>{
            // let xurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a96c43e0d6c4f1bb755112cc1d8488e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true})
            // let data = await fetch(xurl);
            // let parseData = await data.json();
            
            // this.setState({
            //     articles:parseData.articles,
            //     page:this.state.page-1,
            //     loading:false
            // })
        
            this.setState({
                page:this.state.page-1
            })
            this.updateNews()
        
    }
    handleNextClick = async()=>{
            // let xurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a96c43e0d6c4f1bb755112cc1d8488e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true})
            // let data = await fetch(xurl);
            // let parseData = await data.json();
            
            // this.setState({
            //     articles:parseData.articles,
            //     page:this.state.page+1,
            //     loading:false
            // })

            this.setState({
                page:this.state.page+1
            })
            this.updateNews()
       
        
    }

    render() {
    return ( 
      <div className="container my-3">
        
            <h1 className="text-center">NewsNest - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && < Spinner/>}
            <div className="row" >
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4  my-3" key={element.url}>
                        <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
            </div> 
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> 
      </div>
    )
  }
}

export default News
