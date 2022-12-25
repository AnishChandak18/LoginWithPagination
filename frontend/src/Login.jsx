import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const login = () => {

    const pwd = bcrypt.hashSync(password, salt);

    axios.post('http://localhost:2000/login', {
      email: email,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      history.push('/dashboard');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="email"
          value={email}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br /><br />
        <Button
          sx={{
            marginLeft: "10px !important",
            marginRight: "10px",
          }}
          variant="contained"
          color="primary"
          size="small"
          disabled={email == '' && password == ''}
          onClick={login}
        >
          Login
        </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
