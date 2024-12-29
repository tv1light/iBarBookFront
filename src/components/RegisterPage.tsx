import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Validate input fields
        if (!username || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username,
                email,
                password,
            });
            console.log(response.data);
            navigate('/cocktails');
        } catch (error: any) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="logo">iBarBook</div>
                <div className="description">
                    Зарегистрируйтесь, для того чтобы получить дополнительные возможности
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Bind input to state
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Bind input to state
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Bind input to state
                />
                <button
                    type="submit"
                    className="register-button"
                    onClick={handleSignup} // Call handleSignup on click
                >
                    Зарегистрироваться
                </button>
                {error && <div className="error-message">{error}</div>}
                <div className="agreement">
                    Регистрируясь, вы соглашаетесь с <a href="/terms">пользовательским соглашением</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

