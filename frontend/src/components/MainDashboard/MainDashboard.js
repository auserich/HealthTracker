import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MainDashboard.css";
import axios from 'axios';

const MainDashboard = () => {

    const [username,setUsername] = useState([]);
    let [currCal,setCal] = useState([]);
    let [currWater,setWater] = useState([]);
    let [currMin,setMin] = useState([]);
    let [currBurn,setBurn] = useState([]);
    let [currSleep,setSleep] = useState([]);
    let calToday = 0;
    let waterToday = 0;
    let minToday = 0;
    let burnToday = 0;
    let sleepToday = 0;
    const navigate = useNavigate();

    //TODO: get remdering of arrays to happen first no matter what, then figure out bar graph stuff

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });

    useEffect( () => {
        setUsername(localStorage.getItem("username"));

        const getUser = async () => {
            try {
                const response = await axiosInstance.get('/api/user/whoami');
                localStorage.setItem("Id", response.data.id);
                return response.data;
                
            } catch (error) {
              console.error('Error:', error);
            }

        }

        const getGoal = async () => {
          try {
              const response = await axiosInstance.get(`/api/goal/${localStorage.getItem("Id")}`);

              localStorage.setItem("Goal", JSON.stringify(response.data));
              
          } catch (error) {
            console.error('Error:', error);
          }

      }

        const getCalorie = async () => {
          currCal = [];
          var lastDate = new Date();
          lastDate.setDate(lastDate.getDate() - 6);
          
            try {
              for(let i = 0; i < 7; i++) {
                const response = await axiosInstance.get(`/api/meal/calories/${localStorage.getItem("Id")}/${lastDate.toJSON().slice(0,10)}`);
                currCal.push(response.data);
                lastDate.setDate(lastDate.getDate() + 1);
              }          
            } catch (error) {
              console.error('Error:', error);
            }

            calToday = currCal[6];

        }

        const getWater = async () => {
          currWater = [];
          var lastDate = new Date();
          lastDate.setDate(lastDate.getDate() - 6);
            try {
              for(let i = 0; i < 7; i++) {
                const response = await axiosInstance.get(`/api/water/ounces/${localStorage.getItem("Id")}/${lastDate.toJSON().slice(0,10)}`);
                currWater.push(response.data);
                lastDate.setDate(lastDate.getDate() + 1);
              }                 
            } catch (error) {
              console.error('Error:', error);
            }

            waterToday = currWater[6];
        }

        const getExercise = async () => {
          currBurn = [];
          currMin = [];
          var lastDate = new Date();
          lastDate.setDate(lastDate.getDate() - 6);
            try {

              for(let i = 0; i < 7; i++) {
                const response = await axiosInstance.get(`/api/user-exercises/minutes/${localStorage.getItem("Id")}/${lastDate.toJSON().slice(0,10)}`);
                currMin.push(response.data);
                
                const response2 = await axiosInstance.get(`/api/user-exercises/calories/${localStorage.getItem("Id")}/${lastDate.toJSON().slice(0,10)}`);
                currBurn.push(response2.data);
                
                lastDate.setDate(lastDate.getDate() + 1);
              }
            } catch (error) {
              console.error('Error:', error);
            }

            minToday = currMin[6];
            burnToday = currBurn[6];

        }

        const getSleep = async () => {
          currSleep = [];
            var lastDate = new Date();
            lastDate.setDate(lastDate.getDate() - 8);
            try {
              for(let i = 0; i < 7; i++) {
                const response = await axiosInstance.get(`/api/sleep/total/${localStorage.getItem("Id")}/${lastDate.toJSON().slice(0,10)}`);
                currSleep.push(response.data);
                lastDate.setDate(lastDate.getDate() + 1);
              }
               
            } catch (error) {
              console.error('Error:', error);
            }

            sleepToday = currSleep[6];

        }

        getUser().then(getGoal);
        getCalorie();
        getWater();
        getExercise();
        getSleep();

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
                    <p>Calories Consumed Today: {calToday} Calorie(s)</p>
                    <p>Calories Remaining Today: {JSON.parse(localStorage.getItem("Goal")).mealGoal - calToday} Calorie(s)</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navWater}>
                    <h1>Water Log</h1>
                    <p>Water Consumed Today: {waterToday} Ounce(s)</p>
                    <p>Water Remaining Today: {JSON.parse(localStorage.getItem("Goal")).waterGoal - waterToday} Ounce(s)</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navExercise}>
                    <h1>Exercise Log</h1>
                    <p>Time Spent Active Today: {minToday} Minute(s)</p>
                    <p>Calories Burned Today: {burnToday} Calorie(s)</p>

                    <div className="graph">
                        <p>[ph] bar graph of calories consumed this week</p>
                    </div>
                </div>

                <div className="widget" onClick={navSleep}>
                    <h1>Sleep Log</h1>
                    <p>Minutes Slept Most Recently: {sleepToday} Minute(s)</p>
                    <p>Sleep Goal: {JSON.parse(localStorage.getItem("Goal")).sleepGoal - sleepToday} Minute(s)</p>

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
