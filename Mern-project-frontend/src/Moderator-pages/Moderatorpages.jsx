import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';


const Modratorpages = () => {


    const navigate = useNavigate();
    const [getvalue, setvalue] = useState('')
    const [name, setname] = useState('')
    const [getid, setid] = useState('')
    const [info, setinfo] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const idref = useRef();



  useEffect(() => {
    const verifyUser = async () => {

      if (!cookies.jwt) {

        navigate("/");
        console.log('dkjfhafd')
        

      } else {

        const { data } = await axios.get('http://localhost:5000/admin')
        console.log(data)
        setinfo(data)
    
          
      }
    };
    verifyUser();
  }, [cookies, navigate]);


    // info.map(infos => {
    //   console.log(infos.email)
    // })

    
  const logout = () => {
    removeCookie("jwt");
    removeCookie("info");
    navigate("/");
  };



    return (
        <div>
      <header role="banner">
  <h1>Moderator Panel</h1>
 
  <ul class="utilities">

 
    <br/>
    <li onClick={()=>{logout()}} class="logout warn" > Log Out</li>
   
  </ul>
</header>

       
<main role="main">
  
  <section class="panel important">
   <h2>Upcoming</h2>
    
  </section>
  
  <section class="panel important">
    <h2>Moderator</h2>     

            <table>
  <tr>
    <th>id</th>
    <th>email</th>
    <th>Role</th>

 
  </tr>
  

      {
       info && info.length > 0 &&
      info.map(infos => 
    <tr>
    <td>{infos._id}</td>
    <td>{infos.email}</td>
    <td>{infos.role}</td>


  </tr>

      )
    } 
 
</table>

</section>

</main>

        </div>
    )
}

export default Modratorpages