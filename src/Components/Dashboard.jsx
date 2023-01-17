import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { eventGetApi } from '../Redux/AppReducer/action';

export default function Dashboard() {
  const redirect = useNavigate();
  const dispatch = useDispatch()
  const data = useSelector((store) => store.AppReducer.meetupsData)
  const isAuth = useSelector((store) => store.AppReducer.isAuth)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch((eventGetApi()));
  }, [])
  return (
    <div>
      <div>
        <button className="my-events" onClick={() => navigate("/home")} > Show My Events </button>
        {
          isAuth ? <div>
            <button onClick={() => dispatch({ type: "AUTH_LOGOUT" })}>logout</button>
          </div> : <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="register" onClick={() => navigate("/register")}>Register</button>
          </div>
        }
      </div>
      <h2>Upcoming Events</h2>
      <div className="meetups_wrapper" >
        Map the below container against your meetup events data
        {
          data?.map((item) => (
            <div key={item.id}>
              <img style={{ width: "100px" }} className="image" src={item.image} alt="img" />
              <h4 className="title">{item.title}</h4>
              <div className="location"> {item.location}</div>
              <div className="date"> {item.date}</div>
              <div className="time"> {item.time}</div>
              <div className="theme">{item.theme} </div>
              <div className="description"> {item.description}</div>
            </div>
          ))
        }
      </div>
    </div>

  )
}
