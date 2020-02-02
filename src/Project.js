import React, { Component } from 'react';


export default class Project extends Component {
    
      
    render() {
        let divStyle = {
            backgroundColor: "black"
        }
        
        return (
            
            <div style={divStyle} id={this.props.observerId} className="project_item">
               <section className="project_info">
                <h2 className="project_name">{this.props.name}</h2>
                    <section className="description">
                        <p>{this.props.description}</p>
                    </section>
                    <section className="project_links">
                        <a href={this.props.link}>Live</a>
                        <a href={this.props.repo}>Repo</a>
                    </section>
               </section>
                <section className="project_screenshot" id={this.props.newId}>
                    <img className="screenshot_image" src={this.props.screenshot} alt={this.props.ssAlt}></img>
                </section>
            </div>
        )
    }
}