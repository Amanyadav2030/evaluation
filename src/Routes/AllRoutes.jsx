import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Login from '../Components/Login'
import PrivateRoute from '../Components/PrivateRoute'
import Register from '../Components/Register'

export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

        </Routes>
    )
}