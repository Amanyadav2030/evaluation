import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginGetApi } from '../Redux/AppReducer/action'
export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const redirect = useNavigate()
    const errText = useSelector(store => store.AppReducer.errorText)
    console.log(errText)
    const handleSubmit = (e) => {
        e.preventDefault()
        const init = {
            name: name,
            password: password
        }
        dispatch(loginGetApi(init)).then((res) => {
            if (res.type === "auth/login/success") {
                redirect("/")
            }
        });
        console.log(errText)
    }
    return (
        <div style=
            {{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "40%",
                margin: "auto",
            }}
        >
            <form onSubmit={handleSubmit} className="auth_form" style={{ width: "80%" }} >
                <input
                    style=
                    {{
                        width: "90%", padding: "9px",
                        borderRadius: "5px", marginTop: "9px"
                    }}
                    type="name"
                    className="name"
                    placeholder="Enter Name"
                    onChange={(e) => (setName(e.target.value))}
                />
                <br />
                <input
                    style=
                    {{
                        width: "90%", padding: "9px",
                        borderRadius: "5px", marginTop: "9px"
                    }}
                    type="password"
                    className="password"
                    placeholder="Enter password"
                    onChange={(e) => (setPassword(e.target.value))}
                />
                <br />
                <input
                    style={{ width: "95%", padding: "9px", borderRadius: "5px", marginTop: "9px" }}
                    className="submit" type="submit" onClick={handleSubmit} />
            </form>
            <h3 className='error-container'></h3>
        </div>
    )
}
