import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MainDashboard.css";
import axios from 'axios';

const MainDashboard = () => {

    const [user,setUser] = useState([]);
    const [username,setUsername] = useState([]);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
      });

    useEffect( () => {
        setUsername(localStorage.getItem("username"));
        //load user info for food, water, exercise, and sleep

        const getUser = async () => {
            try {
                const response = await axiosInstance.get('/api/user/whoami');
                return response.data;
              } catch (error) {
                console.error('Error:', error);
              }

        }

        

      });
      

    function navFood() {
        navigate("/meal")
      }

      function navWater() {
        navigate("/water")
      }

      function navExercise() {
        navigate("/exercise-tracker")
      }

      function navSleep() {
        navigate("/sleep")
      }

    return(
        <div>
            <div className="main-header">
                <h1>DASHBOARD</h1>
                <p>{username}</p>
            </div>

            <div className="main-body">
                <div className="widget" onClick={navFood}>
                    <h1>Calorie Log</h1>
                    <p>Calories So Far: [ph]</p>
                    <p>Calories Remaining: [ph]</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navWater}>
                    <h1>Water Log</h1>
                    <p>Water So Far: [ph]</p>
                    <p>Water Remaining: [ph]</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navExercise}>
                    <h1>Exercise Log</h1>
                    <p>Time Spent Active: [ph]</p>
                    <p>Calories burned: [ph]</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navSleep}>
                    <h1>Sleep Log</h1>
                    <p>Hours Slept Most Recently: [ph]</p>
                    <p>Sleep Goal: [ph]</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>
            </div>

            <div className="main">
                <a href="http://localhost:3000/"><button>Logout</button></a>
            </div>
        </div>
    );
};

export default MainDashboard;
