import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Form.css';

const API = import.meta.env.VITE_API_BASE_URL;


export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // await axios.post(`${API}/auth/signup`, form); 
      await axios.post('https://capstone-project-back-end.onrender.com/api/auth/signup', form)
      navigate('/login');  
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
