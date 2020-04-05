import React, { Component } from 'react'
import "./Calendar.css"
import moment from 'moment'

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: "#FFD712",
            isToggleOn: {},
            array: ["Holiday", "D", "N", "Project", "Edit", "Sick"],
            colors: ["#FFD712", "#58ACFA", "#58ACFA", "#58ACFA", "#58ACFA", "#FF4000"],
            font_colors: ["red", "white", "white", "white", "white", "white"],
            first_click: true,
            count: 0
        }
    }







    render() {
        //moment npm date/time package
        moment.updateLocale('en', {
            week: {
                dow: 1
                // Monday is the first day of the week.
            }
        });

        const weekdayshort = moment.weekdaysShort(true);

        let weekdayshortname = weekdayshort.map(day => {
            return (
                <th key={day} className="week-day">
                    {day}
                </th>
            );
        });



        //Getting number of days of month
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const numberDaysOfMonth = new Date(year, month, 0).getDate();

        let foo1 = []
        for (let i = 1; i <= numberDaysOfMonth; i++) {
            foo1.push(i)
        }

        const gettingDates = foo1.map((element, index) => {
            return (
                <div className="day" key={index}> {element}</div>
            )
        })

        return (
            <div className="calendar">
                <h1>Calendar</h1>
                <div className="weekdays">{weekdayshortname}</div>
                <div className="dates"> {gettingDates}</div>
            </div>
        )
    }
}
