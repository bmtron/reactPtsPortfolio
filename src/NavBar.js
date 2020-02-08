import React, { Component } from 'react';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastYPos: 0,
            slideIn: 0
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        const currentYPos = window.scrollY;

        if (currentYPos > this.state.lastYPos) {
            this.setState({ slideIn: '-75px'});
        } else {
            this.setState({slideIn: '0px'})
        }
        this.setState({ lastYPos: currentYPos})
    }

    render() {
        return (
            <section className="nav_bar" id="nav_bar" style={ {transform: `translate(0, ${this.state.slideIn})`, transition: 'transform 90ms linear'}}>
                <section className="inner_nav_container">
                    <p onClick={() => this.props.homeScroll()}>Home</p>
                    <p onClick={() => this.props.projectsScroll()}>Projects</p>
                    <p onClick={() => this.props.aboutScroll()}>About</p>
                    <p>Contact</p>
                </section>
            </section>
        )
    }
}