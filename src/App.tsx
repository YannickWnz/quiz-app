import * as React from "react"
import './App.css'
import { Quiz } from "./Components/Quiz/Quiz"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from "./pages/Register/Register"
import { Login } from "./pages/Login/Login"
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute"

function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Quiz />} ></Route> */}
          <Route 
          path='/' 
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } ></Route>
          <Route path='/register' element={ <Register /> } ></Route>
          <Route path='/login' element={ <Login /> } ></Route>
          {/* < */}
        </Routes>
      </Router>
    </>
  )
}

export default App
