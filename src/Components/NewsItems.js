import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title, description, imageUrl,newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width:"23rem"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%', zIndex:1}}>{source}</span>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"UnKnown"} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer" >Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItems
