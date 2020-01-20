import React, { Component } from 'react';


export default class Project extends Component {
    
      
    render() {
        let divStyle = {
            backgroundColor: "black"
        }
        
        return (
            
            <div style={divStyle} id={this.props.observerId} className="project_item">
                <h2 className="project_name">{this.props.name}</h2>
                <section className="ss_container">
                    <section className="hover_display">
                        <section className="project_info">
                        </section>
                    </section>
                </section>
                <section className="description">
                    <p>{/*this.props.description*/}</p>
                </section>
            </div>
        )
    }
}