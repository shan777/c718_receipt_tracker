import React, { Component } from 'react';
// Install React CSS Transition Addon:
// npm install --save react-addons-css-transition-group
import Transition from 'react-addons-css-transition-group';
import Indicators from './indicators';
import imageData from '../../assets/images/carousel';
import './carousel.css';
import { Link } from 'react-router-dom';

class Carousel extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentIndex: 0,
            images: [],
            direction: 'next',
            transitionTime: 500,
            canClick: true
        }
    }

    componentDidMount(){
        if(localStorage.getItem('hasVisited') && this.props.location.pathname === '/'){
            this.props.history.push('/login');
        }

        this.getImageData();
    }

    componentDidUpdate(){
        const { images } = this.state;

        if (images.length) {
            const thing = document.getElementById('thing');
            this.swipe(thing);
        }
    }

    getImageData(){
        // This is where you would make an API call to get image data
        this.setState({
            images: imageData
        });
    }

    enableClick(delay){
        setTimeout(() => {
            this.setState({ canClick: true })
        }, delay);
    }

    directToImage(index){
        const { canClick, transitionTime } = this.state;
        if (!canClick) return;

        this.setState({
            currentIndex: index,
            direction: 'fade',
            canClick: false
        }, () => this.enableClick(transitionTime));
    }

    changeImg = (nextDirection = 'next') => {
        const { canClick, currentIndex, images: { length }, transitionTime } = this.state;
        if(!canClick) return;

        if(nextDirection !== 'next' && nextDirection !== 'previous'){
            nextDirection = 'next'
        }
        
        let nextIndex = nextDirection === 'next' ? currentIndex + 1 : currentIndex - 1;

        if(nextIndex >= length) {
            nextIndex = 0;
        } else if(nextIndex < 0){
            nextIndex = length - 1;
        }
        
        this.setState({
            currentIndex: nextIndex,
            direction: nextDirection,
            canClick: false
        }, () => this.enableClick(transitionTime));
    }

    navigate = () => {
        const { auth, history: { push }} = this.props;

        localStorage.setItem('hasVisited', true);

        if(auth){
            return push('/overview');
        }

        else {
            return push('/login');
        }    
    }

    swipe(el,func) {
        var swipe_det = new Object();
        swipe_det.sX = 0;
        swipe_det.sY = 0;
        swipe_det.eX = 0;
        swipe_det.eY = 0;
        var min_x = 20;  //min x swipe for horizontal swipe
        var max_x = 40;  //max x difference for vertical swipe
        var min_y = 40;  //min y swipe for vertical swipe
        var max_y = 50;  //max y difference for horizontal swipe
        var direc = "";
        var ele = document.getElementById('thing');
        ele.addEventListener('pointerdown',function(e){
        swipe_det.sX = e.clientX; 
        swipe_det.sY = e.clientY;
        },false);
        ele.addEventListener('pointermove',function(e){
        e.preventDefault();
        swipe_det.eX = e.clientX; 
        swipe_det.eY = e.clientY;    
        },false);
        ele.addEventListener('pointercancel',(function(e){
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if(swipe_det.eX > swipe_det.sX) {
                direc = "previous";
                this.changeImg(direc)
            } else {
                direc = "next";
                this.changeImg(direc)
            } 
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if(swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc != "") {
            if(typeof func == 'function') func(el,direc);
        }
        direc = "";
        }).bind(this),false);  
    }

    render(){
        const { direction, currentIndex, images, transitionTime } = this.state;

        if(!images.length){
            return (
                <div className="center-all carousel-container">
                    <h1 className="center">Loading Images</h1>
                </div>
            )
        }

        const { src, text } = images[currentIndex];

        return (
            <div className="center-all">
                {/* <h3 className="carousel-text center">{text}</h3> */}

                <div id="thing" className="carousel-container">
                    <Transition
                        transitionName={`carousel-${direction}`}
                        transitionEnterTimeout={transitionTime}
                        transitionLeaveTimeout={transitionTime}
                    >
                        <img key={src} src={src} alt={text} className="carousel-img" />
                    </Transition>
                </div>

                <div className="carousel_buttons_container">
                    <button className="previous_button" onClick={this.changeImg.bind(this, 'previous')}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>

                    <button className="next_button" onClick={this.changeImg.bind(this, 'next')}>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                    
                    <button onClick={this.navigate} className="finished_button">
                        <i className="material-icons">done_outline</i>
                    </button>
                </div>
                <Indicators onClick={this.directToImage.bind(this)} count={images.length} current={currentIndex} />

            </div>
            // </div>
        );
    }
}

export default Carousel;
