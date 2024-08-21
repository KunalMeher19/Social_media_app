import React, { useEffect, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => (
  <div className="Auth">
    <LogIn />
  </div>
);

function LogIn() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password
    };

    console.log("FormData", formData);

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const resp = response.data;
        console.log(resp)
        localStorage.setItem("userId", resp.data._id);
        localStorage.setItem("image", resp.data.img || ''); // Ensure default values if not available
        localStorage.setItem("followersList", JSON.stringify(resp.data.followersList || [])); // Ensure default values if not available
        localStorage.setItem("name", `${resp.data.firstName} ${resp.data.lastName}`);
        navigate("/home");
        console.log('User signed up successfully', resp.data);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Error:', error);
    }
  };

  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleLogin}>
        <h3>Log In</h3>

        <div>
          <input
            type="email"
            placeholder="email"
            className="infoInput"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account? <Link to={"/signUp"}>Sign up</Link>
          </span>
          <button className="button infoButton">Login</button>
        </div>
      </form>
    </div>
  );
}

const SignUp = () => {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);

  return <Authenticate />;
};

function Authenticate() {
  const [email, setemail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName: lastname,
      email,
      password
    };


    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert('User signed up successfully');
        window.location.href = '/';
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSignup}>
        <h3>Sign up</h3>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastName"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            className="infoInput"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="infoInput"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        <div>
          <span style={{ fontSize: '12px' }}>Already have an account? <Link to={"/"}>Login</Link></span>
        </div>
        <button className="button infoButton">Signup</button>
      </form>
    </div>
  );
}

export { Auth, SignUp };
