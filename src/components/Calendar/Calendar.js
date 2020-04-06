import React, { Component } from 'react'
import "./Calendar.css"
import moment from 'moment'

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            today: moment(),
            dateObject: moment(),
            showMonthPopup: false,
            showYearPopup: false
        }
    }

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d");
        return firstDay - 1;
    }

    daysInMonth = () => {
        return this.state.dateObject.daysInMonth()
    }
    year = () => {
        return this.state.dateObject.format("Y")
    }
    month = () => {
        return this.state.dateObject.format("MMM")
    }
    currentDate = () => {
        return this.state.dateObject.get("date")
    }
    currentDay = () => {
        return this.state.dateObject.format("D")
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
                <td className="day empty">{""}</td>
            )
        }

        //Start filling with the first date of the month in a render function
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} className="day">
                    {d}
                </td>
            );
        }

        //totalSlots contains blanks and daysInMonth using the spread operator. 
        var totalSlots = [...blanks, ...daysInMonth];
        //rows hold  </td> while going to a new row
        let rows = [];
        //cells contain each </td> to assign to each row
        let cells = [];

        //Loop through totalSlots to get a calendar structure of a week.
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
            return <tr>{d}</tr>;
        });

        return (
            <div className="calendar">
                <h1>Calendar</h1>

                <table className="calendar-day">
                    <thead>
                        <tr>{weekdayshortname}</tr>
                    </thead>
                    <tbody>{daysinmonth}</tbody>
                </table>
            </div>
        )
    }
}
