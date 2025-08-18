import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './SignInForm.css';

const SignInForm=() =>{

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: '',
        password: '',
    });



const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value});

}



const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {email , password} = formData;

    if(!email||!password) {
        setError('Email and Password are required');
        return;
    }

    navigate('/dashboard');

};

return (

    <main className="signin-container">

    <h2>Sign In</h2>
    {error && <p className="signin-error">{error}</p>} 
    <form onSubmit = {handleSubmit} autoComplete = "off" className="signin-form">
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
    />

 <label htmlFor="password">Password:</label>
        <input 
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required

/>
<button type = "submit">Sign In</button>
    </form>
    </main>
);
};

export default SignInForm;