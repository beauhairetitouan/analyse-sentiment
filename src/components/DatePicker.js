import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './DatePicker.css';

const DatePicker = ({ date, handleDateChange, isStartDate }) => {
    return (
        <div className="date-picker">
            <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e, isStartDate)}
                className="date-input"
            />
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
        </div>
    );
};

export default DatePicker;
