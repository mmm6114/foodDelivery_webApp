
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import './forms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },{ withCredentials: true });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ user_id: data.user_id, name: data.name})); // Modify according to the actual user data
      alert('Login successful');
      navigate('/');
    } else {
      alert(data.error);
    }
  };

  return (  
    <div className='login'>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <Link as={Link} to="/signup">
                 New User? Signup
                </Link>
                <Link as={Link} to="/">
                  Home
                </Link>
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;