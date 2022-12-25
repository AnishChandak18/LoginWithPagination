import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
const axios = require('axios');

export default function Register() {
  const { handleSubmit, reset, control } = useForm();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = () => {
    if (password === confirmPassword) {
      axios.post('http://localhost:2000/register', {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      }).then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success"
        });
        history.push('/');
      }).catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      });
    } else {
      alert("Passwords does not match! Please check and try again.")
    }
  }
  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Register</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br /><br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <br /><br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={email == '' && password == ''}
          onClick={register}
        >
          Register
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/">
          Login
        </Link>
      </div>
    </div>
  );
}