import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LandingCanvas} from './CustomCanvas';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      styleIn: "transform: rotate(90deg); transition: ease-in .2s;",
      styleOut: "transform: rotate(0deg); transition: ease-in .2s;",
      windowSize: 0,
      mobile: false
    }
    window.addEventListener("resize", this.update)
  }
  scrollToProjects = () => {
    let element = document.getElementById("blah");

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
      <div className="canvas_container">
        <section className="name_title">
          <p className="name">Brendan Meehan</p>
          <p className="title">Full Stack Web Developer</p>
        </section>
        <section className="to_projects" id="to_projects" onClick={() => this.scrollToProjects()} onMouseEnter={() => this.mouseIn()} onMouseLeave={() => this.mouseOut()}><p>Projects</p><i className="material-icons arrow_rotate" id="arrow_rotate">arrow_forward_ios</i></section>
        {this.state.windowSize > 600 ? <LandingCanvas name="Custom_Galaxy" background="#161416"/> : <LandingCanvas name="Custom_Galaxy" touch={false} background="#161416"/>}
        <section className="blah" id="blah">{this.state.windowSize}</section>
      </div>
    )
  }
}

export default App;
