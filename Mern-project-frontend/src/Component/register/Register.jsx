import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");

  const generateError = (err) => {
    console.log("---", err);
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleGetValue = async (e) => {
    // console.log(email , password, role);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/register",
        {
          email,
          password,
          role,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(data);
      if (data) {
        if (data.created) {
          toast.success("user Create succesfully", {
            position: "bottom-right",
          });
        } else {
          toast.error("plese valid email & password", {
            position: "bottom-right",
          });
        }

        if (data.errors) {
          // console.log(error);
          // console.log(err);

          const { email, password } = data.errors;

          if (email) generateError(email);
          else if (password) generateError(password);
          else {
          }
        }
        // alert('user registeerd')
        console.log(data.created);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 mb-5">
          <div className="login100-pic js-tilt" data-tilt>
            <img
              src="https://www.ictamilaonline.com/wp-content/uploads/2021/06/138-1388103_user-login-icon-login.png"
              alt="IMG"
            />
          </div>

          <form className="login100-form validate-form mb-5">
            <span className="login100-form-title">Member Register</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                name="pass"
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button
                onClick={(e) => {
                  handleGetValue(e);
                }}
                className="login100-form-btn"
              >
                Register
              </button>
            </div>

            <div className="text-center p-t-136">
              <Link to={"/"}>
                login your Account?
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
