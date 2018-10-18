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

    changeImg(nextDirection = 'next'){
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

        push('/login');
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

                <div className="carousel-container">
                    <Transition
                        transitionName={`carousel-${direction}`}
                        transitionEnterTimeout={transitionTime}
                        transitionLeaveTimeout={transitionTime}
                    >
                        <img key={src} src={src} alt={text} className="carousel-img" />
                    </Transition>
                </div>
                <button onClick={this.changeImg.bind(this, 'previous')}>Previous</button>
                <button className="next_button" onClick={this.changeImg.bind(this, 'next')}>Next</button>
                <Indicators onClick={this.directToImage.bind(this)} count={images.length} current={currentIndex} />
                <button onClick={this.navigate} className="finished_button">Finished</button>
            </div>
        );
    }
}

export default Carousel;
