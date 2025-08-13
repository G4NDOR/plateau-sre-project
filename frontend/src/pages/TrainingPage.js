// frontend/src/pages/TrainingPage.js

import React, { useEffect, useState } from 'react';
import AccessDeniedPage from './AccessDeniedPage';
import '../styles/TrainingPage.css';

const TypeIcon = ({ type }) => {
    let iconSymbol = '?';
    if (type === 'video') iconSymbol = '▶';
    if (type === 'document' || type === 'Checklist') iconSymbol = '📄';
    if (type === 'quiz') iconSymbol = '❓';
    return <div className="type-icon">{iconSymbol}</div>;
};

function TrainingPage() {
    const [trainingModules, setTrainingModules] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTraining = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('You must be logged in to view training modules.');
                return;
            }

            try {
                const response = await fetch('/api/training/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401 || response.status === 403) {
                    throw new Error('You do not have permission to view this page.');
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch training data.');
                }
                
                const data = await response.json();
                setTrainingModules(data);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch training modules:", err);
            }
        };
        fetchTraining();
    }, []);

    if (error) {
        return <AccessDeniedPage error={error} />;
    }

    if (!trainingModules) {
        return <div>Loading training modules...</div>;
    }

    return (
        <div className="training-page">
            <header className="training-header">
                <h1>Training & Resources</h1>
                <p>Complete your assigned modules to stay up-to-date.</p>
            </header>
            <div className="training-grid">
                {trainingModules.map(module => (
                    <div key={module.id} className="training-card">
                        <div className="card-header">
                            <TypeIcon type={module.icon} />
                            <span className={`status-badge status-${module.status.toLowerCase().replace(' ', '-')}`}>
                                {module.status}
                            </span>
                        </div>
                        <div className="card-body">
                            <p className="module-category">{module.category}</p>
                            <h2 className="module-title">{module.title}</h2>
                        </div>
                        <div className="card-footer">
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${module.progress}%` }}
                                ></div>
                            </div>
                            <div className="footer-details">
                                <span>{module.duration}</span>
                                <button className="start-btn">
                                    {module.status === 'Completed' ? 'Review' : 'Start'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrainingPage;
