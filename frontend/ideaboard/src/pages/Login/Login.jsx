import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(
                'http://3.104.123.79:8000/api/token/',
                {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username : username,
                        password : password,
                    }),
                }
            );
            if(!response.ok){
                throw new Error(`Login Failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('Login response:', data);

            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            alert('Login Successful');
            navigate('/dashboard');
        }catch(error){
            console.log('Login error:', error);
            alert('Invalid username or password');
        }
    };
  return (
    <div className='login'>
      <h1>IdeaBoard</h1>
      <form onSubmit={handleLogin}>
        <div>
            <label>Username</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter username' />
        </div>

        <div>
            <label>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
        </div>

        <button type='Submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
