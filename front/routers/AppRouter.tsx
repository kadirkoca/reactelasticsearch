import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import dataService from "../services/data-service"
import UsersTable from "../frames/UsersTable"
import NewUser from "../frames/NewUser"
import NavigationBar from "../elements/NavigationBar"

const AppRouter = (props: any) => {
    return (
        <React.StrictMode>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<UsersTable />} />
                    <Route path='/newuser' element={<NewUser />} />
                </Routes>
            </Router>
        </React.StrictMode>
    )
}

export default AppRouter
