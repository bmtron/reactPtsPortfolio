import React from 'react';
import {Pt, Group, Line, Create, Circle} from 'pts';
import {PtsCanvas} from 'react-pts-canvas';

export class LandingCanvas extends PtsCanvas {

    constructor() {
        super();
        this.pts = new Group();
        this.pts2 = new Group();
        this.pointerLoc = null;
    }

    _create() {
        this.pts = Create.distributeRandom(this.space.innerBound, 250);
        this.pointerLoc = this.space.pointer;
        console.log(this.pointerLoc)
    }
    animate (time, ftime, space) {
        
        this.pts.rotate2D(0.0002, space.center);
        
        this.pts.sort( (a,b) => 
        a.$subtract(this.space.pointer).magnitudeSq() - b.$subtract(this.space.pointer).magnitudeSq()
        );
        this.pts.forEach( (p, i) => {
                let ratio = Math.min( 1, 1 - (this.space.pointer).$subtract(p).magnitude()/(this.space.size.x / 8) );

            
                let c = Circle.fromCenter(p, 1);
                let c2 = Circle.fromCenter(p, 4);
                
                if (ratio > .7) {
                    this.form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [p, this.pts[i + 1]]);
                    this.form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [this.pts[i + 1], this.pts[i + 2]]);
                    this.form.stroke(`rgba(255,255,255, ${1 - ratio})`).line( [this.pts[i+2], this.pts[i + 3]]);

                }
                this.form.fillOnly(`rgba(255,255,255)`, ratio * 2).circle(c);
                this.form.fill(`rgba(127, 168, 177, ${ratio})`).circle(c2);
                //form.stroke("rgba(255,255,255, .2").line([c])
            });
            
    }

    start (bound, space) {
       this._create();
    }

    action (type, x, y, event) {

    }

    resize (size, event) {
        this._create();
    }
}

