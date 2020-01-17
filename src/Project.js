import React, { Component } from 'react';


export default class Project extends Component {

    render() {
        let divStyle = {
            backgroundImage: `url(${this.props.screenshot})`,
            backgroundSize: 'contain'
        }
        return (
            <div style={divStyle} id={`grid${this.props.gridId}`} className="project_item">
            <h2 className="project_name">{this.props.name}</h2>
            <section className="ss_container">
                <section className="hover_display">
                    <section className="project_info">
                        <ul className="project_tech">
                            {this.props.tech.map((item, index) => {
                                return <li style={{listStyleType: "none"}} key={index} className="tech_li">{item}</li>
                            })}
                        </ul>
                        <div className="links_container_container">
                            <a className="project_link" href={this.props.link} rel="noopener noreferrer" target="_blank"><div className="link_container">Live</div></a>
                            <a className="repo_link" href={this.props.repo} rel="noopener noreferrer" target="blank"><div className="link_container">GitHub</div></a>
                        </div>
                    </section>
                </section>
            </section>
            <section className="description">
                <p>{this.props.description}</p>
            </section>
            </div>
        )
    }
}