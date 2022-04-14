import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Register from "./Component/register/Register";
import Secret from "./Component/Secret";
import React from "react";
import AdminPane from "./Admin-pages/AdminPane";
import PrivateOutlet from "./Private-route/PrivateOutlet";
import Notfound from "./Component/NOtfound/Notfound";
import PrivateModarator from "./Private-route/PrivateModarator";
import Modratorpages from "./Moderator-pages/Moderatorpages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Notfound />} />

        <Route path="/secret" element={<Secret />}></Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="Admin" element={<AdminPane />}></Route>
        </Route>
        <Route path="/" element={<PrivateModarator />}>
          <Route path="moderator" element={<Modratorpages />}></Route>
        </Route>

        {/* <Route path="/Admin" element={<AdminPane/>}></Route> */}
        {/* 
      <Route path="/Admin" element={
      <PrivateRoute>

      <AdminPane/>

      </PrivateRoute>

      }> 
     </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
