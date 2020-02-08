import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {LandingCanvas} from './CustomCanvas';
import Project from './Project';
import list from './project-src';
import NavBar from './NavBar';

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
      prevRatio0: 0,
      prevRatio1: 0,
      prevRatio2: 0,
      prevRatio3: 0,
      navRatio: 0,
      windowHeight: 0,
      lastYPos: 0
    }
    window.addEventListener("resize", this.update)
  }
  updateWindowHeight = () => {
    this.setState({
      windowHeight: window.innerHeight
    })
  }
  SmoothVerticalScrolling(ele, time) {
    
    var eTop = ele.getBoundingClientRect().top;
    console.log(ele.getBoundingClientRect())
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(function() {
          window.scrollBy(0, eAmt)
        }, curTime);
        curTime += time / 100;
    }
}
scrollToAbout = () => {
  let element = document.getElementById("about");
  this.SmoothVerticalScrolling(element, 500);
}
  scrollToHome = () => {
    let element = document.getElementById("canvas_container");

    this.SmoothVerticalScrolling(element, 350);
  }
  scrollToProjects = () => {
    let element = document.getElementById("top_project");

    this.SmoothVerticalScrolling(element, 350);
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
  handleObserver0 = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatio0) {
        entry.target.style.background = "transparent";
        entry.target.style.animation = "fadein"
        entry.target.style.transition = "opacity 1s ease-in";
        entry.target.style.transitionDelay = ".25s";
        entry.target.style.height = "1s";
        entry.target.style.width = "1s";
        entry.target.style.opacity = "1";
      };
      this.setState({
        prevRatioEven: entry.intersectionRatio
      })
    })
  }

  handleObserver1 = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > this.state.prevRatio1) {
        entry.target.style.background = "transparent";
        entry.target.style.transition = "opacity 1s ease-in";
        entry.target.style.transitionDelay = ".75s";
        entry.target.style.height = "1s";
        entry.target.style.width = "1s";
        entry.target.style.opacity = "1"
        entry.target.style.animation = "fadein"

      }
      this.setState({
        prevRatio1: entry.intersectionRatio
      })
    });
    
  }
  
  displayNav = () => {
    let element = document.getElementById("canvas_container");
    let navbar = document.getElementById("nav_bar");
    let n = element.getBoundingClientRect().height;
    let currentYPos = window.scrollY;

    if (window.scrollY > n) {
      console.log(test)
      navbar.style.display = "flex";
      navbar.style.alignItems = "center";
    }

  }
  componentDidMount() {
    this.update();
    this.updateWindowHeight();
    window.addEventListener('scroll', this.displayNav);
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: this.buildThresholdList()
    };
    let navOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    let targetGrid = document.querySelector("#grid");
    let targetGrid1 = document.querySelector("#grid1");
    let targetGrid2 = document.querySelector("#grid2");
    let targetGrid3 = document.querySelector("#grid3");

    let targetImage1 = document.querySelector("#test");
    let targetImage2 = document.querySelector("#test1");
    let targetImage3 = document.querySelector("#test2");
    let targetImage4 = document.querySelector("#test3");

    let targetNav = document.querySelector("#test");

    this.observer = new IntersectionObserver(this.handleObserver0, options);
    this.observer2 = new IntersectionObserver(this.handleObserver0, options);
    this.observer3 = new IntersectionObserver(this.handleObserver0, options);
    this.observer4 = new IntersectionObserver(this.handleObserver0, options);
    this.imageObserver = new IntersectionObserver(this.handleObserver1, options);
    this.imageObserver1 = new IntersectionObserver(this.handleObserver1, options);
    this.imageObserver2 = new IntersectionObserver(this.handleObserver1, options);
    this.imageObserver3 = new IntersectionObserver(this.handleObserver1, options);

    

    
    this.imageObserver.observe(targetImage1);
    this.imageObserver1.observe(targetImage2);
    this.imageObserver2.observe(targetImage3);
    this.imageObserver3.observe(targetImage4);

    this.observer.observe(targetGrid);
    this.observer2.observe(targetGrid1);
    this.observer3.observe(targetGrid2);
    this.observer4.observe(targetGrid3);

  }
  
  render() {
    return (
      <div>
        <NavBar homeScroll={this.scrollToHome} projectsScroll={this.scrollToProjects} aboutScroll={this.scrollToAbout}></NavBar>
        <section className="name_title">
          <p className="name">Brendan <span className="test">Meehan</span></p>
          <p className="title">Full Stack Web Developer</p>
        </section>
        <section className="to_projects" id="to_projects" onClick={() => this.scrollToProjects()} onMouseEnter={() => this.mouseIn()} onMouseLeave={() => this.mouseOut()}><p>Projects</p><i className="material-icons arrow_rotate" id="arrow_rotate">arrow_forward_ios</i></section>
        <div className="canvas_container" id="canvas_container">
        
          <LandingCanvas name="Custom_Galaxy" background="#161416"/>

        </div>
        <section className="project_view_page top_project" id="top_project">
          <Project observerId={"grid"} {...this.state.projectList.list[0]} newId="test"/>
        </section>
        <section className="project_view_page">
          <Project observerId={"grid1"} {...this.state.projectList.list[1]} newId="test1"/>
        </section>
        <section className="project_view_page gray_back">
          <Project observerId={"grid2"} {...this.state.projectList.list[2]} newId="test2"/>
          </section>
        <section className="project_view_page">
          <Project observerId={"grid3"} {...this.state.projectList.list[3]} newId="test3"/>
        </section>

        <section className="about gray_back" id="about">
          <h2>About Me</h2>
          <section className="about_info">
          
              <img className="image_of_me" src={process.env.PUBLIC_URL + '/IMG_0722.jpg'} alt="Headshot of me!"></img>
            
            <section className="about_paragraphs">
              <p>I am graduate of Thinkful's Full Stack web development program. Ever since I built my first computer, I have had a growing passion for technology in all its facets, but more specifically with learning how software functions. 
              Solving unique problems in creative ways is what drives me, and the more I explored programming and software development, the more I fell in love with it.</p>
            <p>
              The process of turning an idea into code, and watching that code become a useful, hands on solution never ceases to excite me. 
              Through building a multitude of well structured, reusable functions and crafting user friendly, accessible UI, I have taken my passion and put it to use, solving problems one web page at a time.
            </p>
            </section>
          </section>
        </section>
      </div>
    )
  }
}

export default App;
