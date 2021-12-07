import React, { useState } from "react";
import Input from '@tds/core-input'
import Box from '@tds/core-box'
import Button from '@tds/core-button'
import './Hey.css';
import { validEmail } from './regex.jsx';
import Axios from 'axios'


function App() {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  //handleEvents
  const validate = () => {

    if (!email.value.match(validEmail)) {

      setEmailErr(true);
    }

    else {
      setEmailErr(false);
    }
    if (password.value.length <= 8) {
      setPwdError(true);
    }
    else {
      setPwdError(false);
    }
  }
  const userFunc = (e) => {
    setEmail({ value: e.target.value })
  }

  const passFunc = (e) => {
    setPassword({ value: e.target.value })
  }

  const handleForm = (e) => {
    e.preventDefault();
    Axios
      .post("/login", {
        emai: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
      });
  
    console.log(e.target)
    console.log(email)
    console.log(password)
  }


  return (
    <div className="App">

      <div className="Form-app">
        <h1 style={{ fontSize: 48, color: "rgb(75, 40, 109)" }} >Hey, Please Log in to continue..</h1> <br />
        <Box between={2}>
          <form onSubmit={handleForm}>
            <Input label="Email" type="text" value={email.value} name="email" onChange={userFunc} />
            {emailErr && <p style={{ color: "red", fontSize: 13 }}>Your email is invalid !</p>}

            <Input label="Password" type="password" value={password.value} name="password" onChange={passFunc} />
            {pwdError && <p style={{ color: "red", fontSize: 13 }}>Your password is invalid !</p>}
          
            <Button type="submit" id="btn1" value="Submit" onClick={validate}>Log in</Button>

          </form>
        </Box>
      </div>
    </div>

  );
}
export default App;