import React, { useEffect, useState } from 'react';
import '../styles/SchedulePage.css';


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function SchedulePage() {
    const [scheduleData, setScheduleData] = useState({});

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/schedule/');
                const data = await response.json();
                setScheduleData(data);
            } catch (error) {
                console.error("Failed to fetch schedule:", error);
            }
        };
        fetchSchedule();
    }, []);

    return (
        <div className="schedule-page">
            <header className="schedule-header">
                <h1>Weekly Staff Schedule</h1>
                <p>August 11th - August 17th, 2025</p>
            </header>
            <div className="schedule-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-column">
                        <h2 className="day-title">{day}</h2>
                        <div className="shifts-container">
                            {scheduleData[day] && scheduleData[day].length > 0 ? (
                                scheduleData[day].map(shift => (
                                    <div key={shift.id} className="shift-card">
                                        <div className="employee-info">
                                            <img src={shift.avatar} alt={shift.employee} className="employee-avatar" />
                                            <div>
                                                <p className="employee-name">{shift.employee}</p>
                                                <p className="employee-role">{shift.role}</p>
                                            </div>
                                        </div>
                                        <p className="shift-time">{shift.shift}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="no-shifts-card">
                                    <p>No shifts scheduled</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SchedulePage;
