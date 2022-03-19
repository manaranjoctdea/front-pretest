import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const login = async () => {
    try {
      const loginSuccesful = await axios.get("http://localhost:8080/user/login", {params: {username, password}});
      if (loginSuccesful.status === 200) {
        setMessage('Login was succesful')
      } else {
        setMessage('Login failes: Review password or username');
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setMessage('Login failes: Review password or username');
      } else {
        setMessage('error occured in login');
      }
    }
  }

  const register = async () => {
    try {
      const newUser = await axios.post("http://localhost:8080/user", {username, password});
      console.dir(newUser);
      if (newUser.status === 200) {
        setMessage('Register was succesful')
      } else {
        setMessage('Register failes: Review password or username');
      }
    } catch (err) {
      setMessage('error occured in register');
    }

  }

  return (
    <div className="App">
      <input id="username" value={username} onChange={(event) => {setUsername(event.target.value)}} type="text" placeholder="Enter your username" />
      <input id="password" valuer={password} onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder="Enter your password" />
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
      {message && (<div>{message}</div>)}
    </div>
  );
}

export default App;
