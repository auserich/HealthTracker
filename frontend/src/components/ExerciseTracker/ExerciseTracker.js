import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const jwtToken = localStorage.getItem('jwtToken');

function ExerciseTracker() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [exerciseData, setExerciseData] = useState({
        exercise: '',
        minutes: 0,
        caloriesBurned: 0,
    });
    const [exerciseList, setExerciseList] = useState([]);

    const userId = localStorage.getItem('userId');
console.log("userID for the logged in user", userId);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseData({
            ...exerciseData,
            [name]: value,
        });
    };

    const handleAddExercise = () => {
        const exerciseToAdd = {
            name: exerciseData.exercise,
            minutes: exerciseData.minutes,
            caloriesBurned: exerciseData.caloriesBurned,
            user_id: userId,
        };
        console.log("excercise added",exerciseToAdd);

        axios
            .post('http://localhost:8080/api/exercises', exerciseToAdd, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setSuccessMessage('Exercise added successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
                setExerciseList([...exerciseList, response.data]);
            })
            .catch((error) => {
                console.error('Error adding exercise:', error);
            });

        setExerciseData({
            exercise: '',
            minutes: 0,
            caloriesBurned: 0,
        });
    };



const handleGoToDashboard = () => {
    navigate('/dashboard');
};

useEffect(() => {
    axios
        .get('http://localhost:8080/api/exercises/user-exercises', {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
        .then((response) => {
            setExerciseList(response.data);
        })
        .catch((error) => {
            console.error('Error retrieving user exercises:', error);
        });
}, []);


return (
    <div>
        <h1>Exercise Tracker</h1>
        <form>
            <div>
                <label>Exercise:</label>
                <input
                    type="text"
                    name="exercise"
                    value={exerciseData.exercise}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Minutes:</label>
                <input
                    type="number"
                    name="minutes"
                    value={exerciseData.minutes}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Calories Burned:</label>
                <input
                    type="number"
                    name="caloriesBurned"
                    value={exerciseData.caloriesBurned}
                    onChange={handleInputChange}
                />
            </div>
            <button type="button" onClick={handleAddExercise}>
                Add Exercise
            </button>
        </form>
        <div>
            <h2>Exercise List</h2>
            <ul>
                {exerciseList.map((exercise, index) => (
                    <li key={index}>
                        Exercise: {exercise.name}, {exercise.minutes} minutes, {exercise.caloriesBurned} calories burned
                    </li>
                ))}
            </ul>
        </div>


        <button type="button" onClick={handleGoToDashboard}>
            Go to Dashboard
        </button>

        <ul>
            {exerciseList.map((exercise, index) => (
                <li key={index}>
                    Exercise: {exercise.name}, {exercise.minutes} minutes, {exercise.caloriesBurned} calories burned
                </li>
            ))}
        </ul>

    </div>

            
);
            };

export default ExerciseTracker;
