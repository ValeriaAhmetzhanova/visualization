import React, { Component } from 'react';
import SimplexNoise from 'simplex-noise'

class CanvasComponent extends Component {
    componentDidMount() {
        this.updateCanvas();
    }
    
    
    updateCanvas() {
        const canvas = this.refs.canvas; 
        // const ctx = this.refs.canvas.getContext('2d');
        // ctx.fillRect(0,0, 100, 100);
    }


    render() {
        return (
            <canvas ref="canvas" className="canvas"/>
        );
    }
}

export default CanvasComponent;