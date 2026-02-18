import { useState } from 'react'
import './App.css'
import WelCome from "./Auth/WelCome/WelCome"
import { Route, Routes } from 'react-router-dom'
import TeamRegistration from './Auth/Registration/TeamRegistration'
import EvaluatorRegistration from './Auth/Registration/EvaluatorRegistration'
import Login from './Auth/Login/Login'
import Forgot from './Auth/Forgot/Forgot'
import ResetPassword from './Auth/ResetPassword/ResetPassword'
import TeamLayout from './Team/TeamLayout/TeamLayout'
import TeamDashboard from './Team/TeamDashboard/TeamDashboard'
import TeamSubmissions from './Team/TeamSubmissions/TeamSubmissions'
import TeamLeaderboard from './Team/TeamLeaderboard/TeamLeaderboard'
import TeamChat from './Team/TeamChat/TeamChat'
import Public from './Public/Public'
import Registration from './Auth/Registration/Registration'
import Adminlogin from './Auth/Adminlogin/Adminlogin'
import AdminLayout from './Admin/AdminLayout'
import Dashboard from './Admin/Pages/Dashboard/Dashboard'
import Evaluators from './Admin/Pages/Evaluators/Evaluators'
import Submissions from './Admin/Pages/Submissions/Submissions'
import Assignments from './Admin/Pages/Assignments/Assignments'
import AllUsers from './Admin/Pages/AllUsers/AllUsers'
import Feedback from './Admin/Pages/Feedback/Feedback'
import Leaderboard from './Admin/Pages/Leaderboard/Leaderboard'
import Teams from './Admin/Pages/Teams/Teams'
import EvaluatorSubmissions from './Evaluator/EvaluatorSubmissions'
// import SubmitScore from './Admin/Pages/SubmitScore/SubmitScore'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/Admin' element={<Adminlogin />} />
        <Route path='/home' element={<Public />} />
        <Route path='/evaluator-submissions' element={<EvaluatorSubmissions />} />
        <Route path='/welcome' element={<WelCome />} />
        <Route path='/TeamRegistration' element={<TeamRegistration />} />
        <Route path='/EvaluatorRegistration' element={<EvaluatorRegistration />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Forgot' element={<Forgot />} />
        <Route path='/ResetPassword' element={<ResetPassword />} />

        <Route element={<TeamLayout />}>
          <Route path='/Teamdashboard' element={<TeamDashboard />} />
          <Route path='/TeamSubmissions' element={<TeamSubmissions />} />
          <Route path='/TeamLeaderboard' element={<TeamLeaderboard />} />
          <Route path='/TeamChat' element={<TeamChat />} />
        </Route>
        {/* Admin */}

        <Route element={<AdminLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AllUsers" element={<AllUsers />} />
        {/* <Route path="/SubmitScore" element={<SubmitScore />} /> */}
        <Route path="/Evaluators" element={<Evaluators />} />
        <Route path="/Submissions" element={<Submissions />} />
        <Route path="/Assignments" element={<Assignments />} />
        <Route path="/Teams" element={<Teams />}  />

        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />

        
      </Route>

      </Routes>
    </>
  )
}

export default App


