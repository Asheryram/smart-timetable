import React from 'react'
import Login from './screens/Login'
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App