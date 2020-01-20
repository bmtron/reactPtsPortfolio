import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LandingCanvas} from './CustomCanvas';
import Project from './Project';
import list from './project-src';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleIn: "transform: rotate(90deg); transition: ease-in .2s;",
      styleOut: "transform: rotate(0deg); transition: ease-in .2s;",
      windowSize: 0,
      mobile: false,
      projectList: list,
      prevRatioEven: 0,
      prevRatioOdd: 0,
      prevRatio2: 0,
      prevRatio3: 0
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
  buildThresholdList = () => {
    let thresholds = [];
    let numSteps = 20;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
  }
  handleObserverEven = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatioEven) {
        entry.target.style.cssText= "display: block";
        entry.target.style.animation = "fadein"
        entry.target.style.transition = "opacity 1.5s ease-in";
        entry.target.style.opacity = "1";
      };
      this.setState({
        prevRatioEven: entry.intersectionRatio
      })
    })
  }

  handleObserverOdd = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatioOdd) {
        entry.target.style.cssText = "display: block";
        entry.target.style.transition = "1.5s ease-in";
        entry.target.style.transitionDelay = ".25s";
        entry.target.style.opacity = "1"
        entry.target.style.animation = "fadein"

      }
      this.setState({
        prevRatioOdd: entry.intersectionRatio
      })
    });
    
  }
  handleObserver2= (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatio2) {
        entry.target.style.cssText = "display: block";
        entry.target.style.transition = "1.5s ease-in";
        entry.target.style.transitionDelay = ".5s"
        entry.target.style.opacity = "1"
        entry.target.style.animation = "fadein"

      }
      this.setState({
        prevRatio2: entry.intersectionRatio
      })
    });
    
  }
  handleObserver3 = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatio3) {
        entry.target.style.cssText = "display: block";
        entry.target.style.transition = "1.5s ease-in";
        entry.target.style.opacity = "1"
        entry.target.style.transitionDelay = ".75s"
        entry.target.style.animation = "fadein"

      }
      this.setState({
        prevRatio3: entry.intersectionRatio
      })
    });
    
  }

  componentDidMount() {
    this.update();
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: this.buildThresholdList()
    };
    let targetGrid = document.querySelector("#grid");
    let targetGrid1 = document.querySelector("#grid1");
    let targetGrid2 = document.querySelector("#grid2");
    let targetGrid3 = document.querySelector("#grid3");

    this.observer = new IntersectionObserver(this.handleObserverEven, options);
    this.observer2 = new IntersectionObserver(this.handleObserverOdd, options);
    this.observer3 = new IntersectionObserver(this.handleObserver2, options);
    this.observer4 = new IntersectionObserver(this.handleObserver3, options);

    this.observer.observe(targetGrid);
    this.observer2.observe(targetGrid1);
    this.observer3.observe(targetGrid2);
    this.observer4.observe(targetGrid3);

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
        <div className="background_canvas_test"></div>
        <section className="blah" id="projects">
         <section className="projects_container">
          
            <section className="box_wrapper">
              <Project observerId={"grid"} {...this.state.projectList.list[0]}/>
              <Project observerId={"grid1"} {...this.state.projectList.list[1]}/>
            </section>
            <section className="box_wrapper">
              <Project observerId={"grid2"} {...this.state.projectList.list[2]}/>
              <Project observerId={"grid3"} {...this.state.projectList.list[3]}/>
            </section>
         </section>
        </section>
        <section className="test_space">
          <p>TEST SCREEN</p>
        </section>
      </div>
    )
  }
}

export default App;
