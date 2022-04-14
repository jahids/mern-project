import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./admin.css";

const AdminPane = () => {
  const navigate = useNavigate();
  const [getvalue, setvalue] = useState("");
  const [name, setname] = useState("");
  const [getid, setid] = useState("");
  const [info, setinfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handlepassUpdate = (id) => {
    console.log(id);
    console.log(getvalue);
    const { data } = axios.post(`http://localhost:5000/update/${id}`, {
      getvalue,
    });
    // console.log(idref.value)
    // console.log(cookies.info.user);
    if(!data){
      toast.success("Role Updated", {
        position: toast.POSITION.TOP_CENTER
      })
    }else{
     
    }
  };

  const handleDelete = (id) => {
    const { data } = axios.post(`http://localhost:5000/Delete/${id}`);
    if (!data) {
      toast.error(`${id} Deleted`, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/");
        console.log("dkjfhafd");
      } else {
        const { data } = await axios.get("http://localhost:5000/admin");
        console.log(data);
        setinfo(data);
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const logout = () => {
    removeCookie("jwt");
    removeCookie("info");
    navigate("/");
  };
  return (
    <div>
      <h2>this is a admin panel </h2>
      <p>all users </p>

      <header role="banner">
        <h1>Admin Panel</h1>
        <ul class="utilities">
          <br />

          <li onClick={()=>{navigate('/moderator')}} class="users">
            Moderator
          </li>
          
          <li onClick={()=>{navigate('/secret')}} class="users">
            user
          </li>
          <li onClick={()=>{logout()}} class="logout warn">
            Log Out
          </li>
        </ul>
      </header>

      <nav role="navigation">
        <ul class="main">
          <li class="dashboard">
            Dashboard
          </li>
          <li class="edit">
            Edit Website
          </li>
          <li class="write">
           Write news
          </li>
          <li class="comments">
            Ads
          </li>
          <li class="users">
            Manage Users
          </li>
        </ul>
      </nav>

      <main role="main">
        <section class="panel important">
          <h2>upcoming...</h2>
          <ul>
            <li>Information Panel</li>
          </ul>
        </section>

        <section class="panel important">
          <h2>All User</h2>

          <table>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>Role</th>
              <th className="action">Action</th>
            </tr>

            {info &&
              info.length > 0 &&
              info.map((infos) => (
                // <li>
                //   {infos.email}
                // </li>
                <tr>
                  <td>{infos._id}</td>
                  <td>{infos.email}</td>
                  <td>
                    <select
                      name="role"
                      defaultValue={infos.role}
                      onChange={(e) => {
                        setvalue(e.target.value);
                      }}
                      id="role"
                    >
                      <option value="ADMIN">admin</option>
                      <option value="MODERATOR">Maderator</option>
                      <option value="CLIENT">User</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="update"
                      onClick={() => {
                        handlepassUpdate(infos._id);
                      }}
                      type="submit"
                      value="update"
                    />
                    <input
                      className="update"
                      onClick={() => {
                        handleDelete(infos._id);
                      }}
                      type="submit"
                      value="Delete"
                    />
                  </td>
                </tr>
              ))}
          </table>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AdminPane;
