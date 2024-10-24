import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import CreateTask from './CreateTask'
import GetTask from './GetTask'
import UpdateTask from './UpdateTask'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/task' element={<GetTask/>}/>
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path='/updateTask' element={<UpdateTask/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
