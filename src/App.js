import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LandingCanvas} from './CustomCanvas';
import Project from './Project';
import list from './project-src';
import Slide from 'react-reveal/Slide';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleIn: "transform: rotate(90deg); transition: ease-in .2s;",
      styleOut: "transform: rotate(0deg); transition: ease-in .2s;",
      windowSize: 0,
      mobile: false,
      projectList: list
    }
    window.addEventListener("resize", this.update)
  }
  scrollToProjects = () => {
    let element = document.getElementById("projects");

    element.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
  update = () => {
    this.setState({
      windowSize: window.innerWidth
    })
  }
  mouseIn() {
    let element = document.getElementById("arrow_rotate");
    element.style = this.state.styleIn;
  }
  mouseOut() {
    let element = document.getElementById("arrow_rotate");
    element.style = this.state.styleOut;
  }
  
  componentDidMount() {
    this.update();
  }
  
  render() {
    return (
      <div>
        <section className="name_title">
          <p className="name">Brendan <span className="test">Meehan</span></p>
          <p className="title">Full Stack Web Developer</p>
        </section>
        <section className="to_projects" id="to_projects" onClick={() => this.scrollToProjects()} onMouseEnter={() => this.mouseIn()} onMouseLeave={() => this.mouseOut()}><p>Projects</p><i className="material-icons arrow_rotate" id="arrow_rotate">arrow_forward_ios</i></section>
        <div className="canvas_container">
        <div className="canvas_cover"></div>
          <LandingCanvas name="Custom_Galaxy" background="#161416"/>
          
        </div>
        <section className="blah" id="projects">
         <section className="projects_container">
          {this.state.projectList.list.map((item, index) => {
              if ((index + 2) % 2 === 0) {
                return <Slide key={index} left><Project {...item} gridId={index}/></Slide>
              }
              else {
                return <Slide key={index} right><Project key={index} {...item} gridId={index}/></Slide>
              }
            })}
         </section>
        </section>
      </div>
    )
  }
}

export default App;
