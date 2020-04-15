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
            selectedDay: null,
            bgColor: false,
            selectedDays: [],
            clicked: true,
            showYearTable: false,
        }
        this.baseState = this.state
    }

    changeColor = (e, d) => {
        e.preventDefault();
        const updatedItems = [...this.state.selectedDays, d]
        //const updatedClicked = [...updatedItems,]

        this.setState({ selectedDay: d, selectedDays: updatedItems, bgColor: !this.state.bgColor, clicked: this.state.clicked },
            () => {
                console.log("SELECTED DAY: ", this.state.selectedDay, this.state.selectedDays)
            }
        )
    }



    handleClick(e) {
        let cName = e.currentTarget.className;
        let classNames = []
        switch (cName) {
            case 'day today':
                console.log('It is a light purple box');
                break;
            case 'day':
                console.log('It is a white box');
                classNames.push("active")
                break;
            case 'active':
                console.log('It is a purple box');
                break;
            default:
                console.log('I don\'t know the exact color');
                break;
        }
    }

    deleteItem = (d) => {
        const itemsArray = this.state.selectedDays
        const index = itemsArray.indexOf(d)
        itemsArray.splice(index, 1)
        //if (index > -1) {
        //    itemsArray.splice(index, 1);
        // }
        return itemsArray
        //this.setState({ selectedDays: itemsArray })

    }

    removeDuplicates = () => {
        const array = this.state.selectedDays
        const uniqueSet = new Set(array)
        const backToArray = [...uniqueSet]
        return backToArray
        //this.setState({ selectedDays: backToArray })
    }

    checkUniqueArray = (myArray) => {
        return myArray.length === new Set(myArray).size
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
    onPrev = () => {
        this.setState({
            dateObject: this.state.dateObject.subtract(1, "month")
        });
    };

    onNext = () => {
        this.setState({
            dateObject: this.state.dateObject.add(1, "month")
        });
    };


    reset = () => {
        let curr = moment().month()
        this.setState({ dateObject: this.state.dateObject.month(curr, "month"), selectedDays: [] })
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
            let currentDay = d == this.currentDay() ? "today" : ""
            let classNames = ["day"]
            if (currentDay === "today") {
                classNames.push("today")
            }
            /*
            if (this.state.selectedDays.includes(d)) {
                /*if (this.checkUniqueArray(this.state.selectedDays)) {
                    console.log("Unique number")
                    classNames.push("active")
                } else {
                    console.log("Not unique number")
                    //this.deleteItem(d)
                    if (classNames.includes("active")) {
                        classNames.pop()
    
                    }
                    //classNames.filter(word => word.length > 5)
    
                }

                if (classNames.length === 1) {

                    classNames.push("active")
                    console.log("pop")

                } else if (classNames.length === 2) {
                    classNames.pop()
                    console.log("push")

                }

            }*/

            //classNames.push("active")
            //classNames.push("active")
            //this.deleteItem(d)
            //console.log(`Is it unique: ${this.checkUniqueArray(this.state.selectedDays)}`)

            //} else {
            //classNames.pop("active")
            //classNames.filter(word => word.length < 5)

            //console.log(classNames)


            if (this.state.clicked && this.state.selectedDay === d) {
                classNames.push('active');
            }

            //console.log(beasts.indexOf('bison'));

            daysInMonth.push(
                <td
                    key={d}
                    className={classNames.join(" ")}
                    //className={this.state.activeKey === d ? "day active" : "day"}
                    //className={this.state.selectedDays.includes(d) ? "day active" : "day"}
                    onClick={(e) => this.changeColor(e, d)}
                    id={d}>
                    {/*this.state.bgColor ? d : d*/}
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
            return <tr key={i}>{d}</tr>;
        });

        return (
            <div className="calendar">
                <h1>Calendar</h1>
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
                <div className="calendar-navi reset" onClick={this.reset}>Reset</div>
            </div>
        )
    }
}
