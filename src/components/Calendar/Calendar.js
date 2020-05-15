import React, { Component } from 'react'
import "./Calendar.css"
import moment from 'moment'
import right from "../../images/right.png"
import left from "../../images/left.png"
import Modal from "react-modal"

Modal.setAppElement(document.getElementById('root'));

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: moment(),
            dateObject: moment(),
            allmonths: moment.months(),
            showModal: false,
            disabled: false,
            req: process.env.REACT_APP_REQ,
            name: ""

            //selectedDay: null,
            //bgColor: true,
            //selectedDays: [],
            //clicked: false,
            //showYearTable: false,

           
        }
    }
    /*
    changeColor = (e, d) => {
        e.preventDefault()
        const updatedItems = [...this.state.selectedDays, d]
        //const updatedClicked = [...updatedItems,]

        this.setState({ selectedDay: d, selectedDays: updatedItems, bgColor: this.state.color ? "#9370DB" : "#FFF", clicked: !this.state.clicked },
            () => {
                console.log("SELECTED DAY: ", this.state.selectedDay, this.state.selectedDays, this.state.bgColor)
            }
        )
    }*/
    
    //handle password input 
    handlePass = (e) => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
    }

    //handle modal form
    handleSubmit = (e) => {
        e.preventDefault()
        const {name, req} = this.state
        let messages = []
        if (name !== req ) {
            alert("Incorrect password")
            return
        } else {
            messages.push("Correct password+")
            this.setState({disabled: true, showModal: false})
        }
        return messages
    }

    //Show modal
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    //Hide modal  
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    //Change color of calendar cell after click
    clicked = (event) => {
        let currentColor = event.target.getAttribute("data-color")
        //let newColor = currentColor == "#FFF" ? "#e74c3c" : "#FFF"        
        let newColor
        if (currentColor == "#b8e994") {
            newColor = "#e55039"
        } else if (currentColor == "#e55039") {
            newColor = "#f6b93b"
        } else if (currentColor == "#f6b93b") {
            newColor = "#b8e994"
        } 
       //this.refs.tester.setAttribute("data-color", newColor) 
        event.target.setAttribute("data-color", newColor)
        event.target.style.backgroundColor = newColor;
    }

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject
        let firstDay = moment(dateObject).startOf("month").format("d") //Day of week 0.. 1.. 2..
        return firstDay - 1
    }
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth()
    }
    year = () => {
        return this.state.dateObject.format("Y")
    }
    month = () => {
        return this.state.dateObject.format("MMMM")
    }
    currentDate = () => {
        return this.state.dateObject.get("date")
    }
    currentDay = () => {
        return this.state.dateObject.format("D")
    }

    MonthList = (props) => {
        let months = [];
        props.data.map((data, i) => {
            return (
                months.push(
                    <td key={i}>
                        <span>{data}</span>
                    </td>
                ))
        })
    }

    weekdays = moment.weekdays()
    weekdaysShort = moment.weekdaysShort()
    months = moment.months()
    onPrev = () => {
        this.setState({
            dateObject: this.state.dateObject.subtract(1, "month"), selectedDay: null
        });
    };
    onNext = () => {
        this.setState({
            dateObject: this.state.dateObject.add(1, "month"), selectedDay: null
        });
    };

    reset = () => {
        let currMonth = moment().month()
        this.setState({ dateObject: this.state.dateObject.month(currMonth, "month"), selectedDays: [] })
        //console.log(moment().year())
    }

    render() {
        //moment npm date/time package
        moment.updateLocale('en', {
            week: {
                dow: 1
                // Monday is the first day of the week.
            }
        })

        const weekdayshort = moment.weekdaysShort(true)
        let weekdayshortname = weekdayshort.map(day => {
            return (
                <th key={day} className="week-day">
                    {day}
                </th>
            )
        })

        //Create blank cell if new month doesn't start Monday
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td key={i * 51} className="empty">{""}</td>
            )
        }

        //Start filling with the first date of the month 
        let daysInMonth = []
        for (let d = 1; d <= this.daysInMonth(); d++) {
            //let currentDate = d == this.currentDate() ? "today" : ""
            let classNames = ["day"]
            //if (currentDate === "today") {
            //    classNames.push("today")
            //}
            daysInMonth.push(
                <td
                    key={d}
                    className={classNames.join(" ")}
                    data-color="#b8e994"
                    //disabled = {(this.state.disabled)? "disabled" : ""}     
                    id={d}>
                    {d}
                </td>
            );
        }

        //Combine blank cells and day cells together. 
        var totalSlots = [...blanks, ...daysInMonth]
        //rows hold  </td> while going to a new row
        let rows = [];
        //cells assigned to each row or </td>
        let cells = [];

        //Loop through totalSlots to get a calendar structure of a week and break to a new row every 7 days
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row); // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells); // when reach next week we contain all td in last week to rows 
                cells = []; // empty container 
                cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
                rows.push(cells);
            }
        });
        //Wrap all rows in a </td>
        let daysinmonth = rows.map((d, i) => {
            return <tr 
                    key={i} 
                    //data-color="#b8e994" 
                    //ref="tester" 
                    
                    onClick={this.state.disabled? (e) => {this.clicked(e)}: null}>{d}</tr>
        });

        
        //console.log((e) => this.handleSubmit(e))

        return (
            <div className="calendar">
                <h1 className="calendar-label">Calendar</h1>
                <div className="allsquares">
                        <div className="square red"/>
                        <div className="small_margin" >I'm unavailable</div>              
                        <div className="square yellow"/>
                        <div className="small_margin">Partially available</div>    
                        <div className="square green"/>
                        <div>Fully available</div>
                </div>
                <div className="nav">
                    <img src={left} alt="" onClick={(e) => { this.onPrev() }} className="prev-calendar" />
                    <div className="calendar-navi">
                        {`${this.month()} ${this.year()}`}
                    </div>
                    <img src={right} alt="" onClick={(e) => { this.onNext() }} className="next-calendar" />
                </div>
                <table className="calendar-day">
                    <thead>
                        <tr>
                            {weekdayshortname}
                        </tr>
                    </thead>
                        <tbody>
                            {daysinmonth}
                        </tbody>
                </table>
                <div className="btns">
                    <div className="calendar-navi reset" onClick={this.reset}>Reset</div>
                    <div className="pass" onClick={this.handleOpenModal}>Modify Calendar. Password required</div>
                    <Modal 
                        style={{
                            overlay: 
                            {position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.75)' }, 
                            content: 
                            { backgroundColor: "lightgreen", 
                            border: "2px solid #519e8a",
                            width:"350px",
                            height:"230px",
                            margin: "0 auto",
                            top: "40%"
                        }
                        }}
                        isOpen={this.state.showModal}
                        contentLabel="Password request">
                        <form onSubmit={this.handleSubmit}>           
                            <label htmlFor="message">Provide password</label>
                            <input type="password" name="name" value={this.state.name} onChange={this.handlePass}/>
                            <button 
                                type="submit"
                                name="submit"
                                value="send" 
                                style={{border:"3px solid #519e8a", 
                                        borderRadius:"50px", 
                                        width: "100px", 
                                        height:"50px", 
                                        margin:"10px",
                                        cursor: "pointer"}}
                                >
                                Enter
                            </button>
                            <p className="pass_message">d</p>  
                            <button 
                                type="button"
                                onClick={this.handleCloseModal} 
                                style={{position:"absolute", top:"5px", right:"5px"}}>
                                X
                            </button>
                        </form>  
                    </Modal>
                </div>
            </div>
        )
    }
}
