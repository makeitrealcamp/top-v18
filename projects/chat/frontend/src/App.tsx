import React, { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

const Chat = React.lazy(() => import("./pages/Chat"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Chat user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
