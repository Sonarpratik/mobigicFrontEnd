import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Auth from './features/Auth';
import Home from './pages/Home';
import { useEffect } from 'react';
import { getUser } from './features/authfunctions/userLogin';
import { useDispatch } from 'react-redux';
import Register from './pages/Register';
import Download from './pages/Download';

function App() {
const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
    <BrowserRouter>
            <Navbar />
          <div className="w-full" style={{ height: "100%" }}>
          <div style={{width:"80vw",margin:"auto",marginTop:"20px"}}>

              <Routes>

                {/* <Header /> */}
                <Route
                  path="/"
                  element={
                    <Auth>
                      <Home />
                    </Auth>
                  }
                  />
                <Route
                  path="/register"
                  element={
                    <Register />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Login />
                  }
                  />
                <Route
                  path="/download"
                  element={
                    <Download />
                  }
                  />
              </Routes>
                  </div>
              </div>

    </BrowserRouter>

    </>
  )
}

export default App
