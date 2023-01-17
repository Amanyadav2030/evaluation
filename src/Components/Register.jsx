import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerPostApi } from '../Redux/AppReducer/action';

export default function Register() {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [interests, setInterests] = useState("");
    const [password, setPassword] = useState("");
    const redirect = useNavigate()
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        const init = {
            name: name,
            location: location,
            interests: interests.split(","),
            password: password
        }
        e.preventDefault();
        dispatch(registerPostApi(init));
        setTimeout(() => {
            redirect('/login')
        }, 2000);
    }

    return (
        <div>
            <form className="auth_form"  >
                <input
                    type="name"
                    className="name"
                    placeholder="Enter Name"
                    onChange={(e) => (setName(e.target.value))}
                />
                <br />
                <input
                    type="text"
                    className="location"
                    placeholder="Location"
                    onChange={(e) => (setLocation(e.target.value))}
                />
                <br />
                <input
                    type="text"
                    className="interests"
                    placeholder="What are your interests? Add comma separated values"
                    onChange={(e) => (setInterests(e.target.value))}
                />
                <br />
                <input
                    type="password"
                    className="password"
                    placeholder="Enter password"
                    onChange={(e) => (setPassword(e.target.value))}
                />
                <br />
                <input className="submit" type="submit" onClick={handleSubmit} />

            </form>
        </div>
    )
}