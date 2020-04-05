import React, { Component } from 'react'
import "./Home.css"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import dog01 from "../../images/dog01.jpg"
import dog02 from "../../images/dog02.jpg"
import dog03 from "../../images/dog03.jpg"
import lorem from "../../images/lorem.jpg"
import Calendar from "../Calendar/Calendar"

export default class MyCarousel extends Component {
    constructor() {
        super()
        this.state = { value: 0 };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({ value });
    }

    render() {
        return (
            <div>
                <Carousel className="main"
                    value={this.state.value}
                    onChange={this.onChange}
                    slides={[
                        (<img src={dog01} alt="dog's pic" />),
                        (<img src={lorem} alt="text" />),
                        (<img src={dog02} alt="dog's pic" />),
                        (<img src={lorem} alt="text" />),
                        (<img src={dog03} alt="dog's pic" />),
                        (<img src={lorem} alt="text" />)
                    ]}
                    clickToChange
                    infinite
                    //rtl dots
                    slidesPerPage={2}
                    breakpoints={{
                        640: {
                            slidesPerPage: 1,
                        },
                        900: {
                            slidesPerPage: 2,
                        }
                    }}
                    autoPlay={6000}
                    animationSpeed={1000}
                />
                <Calendar />
            </div>
        );
    }
}

