import '../css/login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);  
    navigate('/user');  
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>LOGIN</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label className='form-label'>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              name="username"
              value={formData.username}
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='form-label'>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email"
              value={formData.email}
              onChange={handleChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='form-label'>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button type="submit" className='btn btn-success rounded-pill px-5 mt-2'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
