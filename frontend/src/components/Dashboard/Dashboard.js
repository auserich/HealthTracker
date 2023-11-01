import React from 'react';
import ExerciseTracker from '../ExerciseTracker/ExerciseTracker'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const username = localStorage.getItem('username');
    const Id = localStorage.getItem('userId');

    console.log(username);
    console.log(Id);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        navigate('/login');

    };

    return (
        <div>
            <div className="header">
                <div className="user-info">
                    <span>Welcome, {username}</span>
                </div>
                <div className="logout-button">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>



            <h1>Dashboard</h1>
             <Link to="/exercise-tracker">
                <button>Exercise Tracker</button>
            </Link>
        </div>


    );
};

export default Dashboard;
