import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import './SignInForm.css';
import { signIn} from '../Services/authService';
import { UserContext } from '../Contexts/UserContext';

const SignInForm=() =>{

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({

        email: '',
        password: '',
    });

const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value});

}



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.email||!formData.password) {
    setError('Email and Password are required');
        return;
    }

    try {
        const loggedInUser = await signIn(formData);
        setUser(loggedInUser);
    

    if (loggedInUser.is_manager) {
        navigate('/dashboard');
      } else {
        navigate('/artiste');
      }
    } catch (err: any) {
      setError(err.message);
    }
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