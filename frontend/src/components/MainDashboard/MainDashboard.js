import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MainDashboard.css";

const MainDashboard = () => {


    const [username,setUsername] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        setUsername(localStorage.getItem("username"));
        //load user info for food, water, exercise, and sleep
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
                    <p>Calories So Far:</p>
                    <p>Calories Remaining:</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navWater}>
                    <h1>Water Log</h1>
                    <p>Water So Far:</p>
                    <p>Water Remaining:</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navExercise}>
                    <h1>Exercise Log</h1>
                    <p>Time Spent Active:</p>
                    <p>Calories burned:</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navSleep}>
                    <h1>Sleep Log</h1>
                    <p>Hours Slept Last Night:</p>
                    <p>Sleep Goal:</p>

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
