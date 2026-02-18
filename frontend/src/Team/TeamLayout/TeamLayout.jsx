import React from 'react'
import { Outlet } from 'react-router-dom'
import TeamNavbar from '../Components/Navbar/TeamNavbar'

const TeamLayout = () => {
    return (
        <div>
            <TeamNavbar />
            <Outlet />
        </div>
    )
}

export default TeamLayout