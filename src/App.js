import Home from "./pages/Home";
import SignUp from './pages/SignUp';
import Loading from './pages/Loading';
import InsertUserData from './pages/InsertUserData';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import StartPage from "./worldcupPages/startpage";
import VsPage from "./worldcupPages/vspage";
import Vs16Page from "./worldcupPages/vs16page";
// import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="/userData" element={<InsertUserData />}></Route> 
        <Route path='/worldcup' element={<StartPage/>} />
        <Route path='/worldcup/vs8' element={<VsPage/>} />
        <Route path='/worldcup/vs16' element={<Vs16Page/>} />         
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;