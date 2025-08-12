import React, { useEffect, useState } from 'react';
import '../styles/TrainingPage.css';


// Helper to get the right icon (using simple text for now, could be SVGs)
const TypeIcon = ({ type }) => {
    let iconSymbol = '?';
    if (type === 'video') iconSymbol = '▶';
    if (type === 'document' || type === 'Checklist') iconSymbol = '📄';
    if (type === 'quiz') iconSymbol = '❓';
    return <div className="type-icon">{iconSymbol}</div>;
};


function TrainingPage() {
    const [trainingModules, setTrainingModules] = useState([]);

    useEffect(() => {
        const fetchTraining = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/training/');
                const data = await response.json();
                setTrainingModules(data);
            } catch (error) {
                console.error("Failed to fetch training modules:", error);
            }
        };
        fetchTraining();
    }, []);

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
