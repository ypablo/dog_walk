import React, { Component } from 'react'
import "./Calendar.css"
import moment from 'moment'
import right from "../../images/right.png"
import left from "../../images/left.png"


export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: moment(),
            dateObject: moment(),
            allmonths: moment.months(),
            mediumpurple: null,
            selectedDay: 5,
            showMonthPopup: false,
            showYearPopup: false
        }
    }

    test = () => {
        alert("Test")
    }


    changeColor = (e, d) => {
        let newBgColor = this.state.mediumpurple ? null : "#9370DB"
        this.setState({ mediumpurple: newBgColor, selectedDay: d },
            () => {
                console.log("SELECTED DAY: ", this.state.selectedDay, this.state.mediumpurple)
            }
        )
    }

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject
        let firstDay = moment(dateObject).startOf("month").format("d") //Day of week 0.. 1.. 2..
        return firstDay - 1;
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
    onPrev = () => { };
    onNext = () => { };

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
        let daysInMonth = [];
        //let done = this.state.mediumpurple ? "purplemedium" : null;
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let currentDay = d == this.currentDay() ? "today" : ""
            daysInMonth.push(
                <td
                    key={d}
                    className={`day ${currentDay}`}
                    onClick={(e) => this.changeColor(e, d)}
                    style={{ backgroundColor: this.state.mediumpurple }}
                    id={d}
                >
                    {d}
                </td>
            );
        }
        console.log(this.state.selectedDay)
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
            return <tr key={i}>{d}</tr>;
        });

        return (
            <div className="calendar">
                <h1>Calendar</h1>
                <div className="nav">
                    <img src={left} alt="" />
                    <div className="calendar-navi">
                        {this.month()}
                    </div>
                    <img src={right} alt="" />
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
            </div>
        )
    }
}
