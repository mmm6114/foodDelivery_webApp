import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './forms.css';

const Signup = () => {
  // Defining state for the input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Hook for navigating to other routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents the form from refreshing the page

    console.log('Form submitted', { name, email, password, phoneNumber }); // Logs form data for debugging

    try {
      // Sending the data to the backend
      const response = await fetch('http://localhost:8000/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number: phoneNumber  // Sending phone number as 'phone_number' for consistency with backend
        }),
      });

      const data = await response.json();  // Parsing the response

      if (response.ok) {  // If signup is successful
        alert('Signup successful');  // Notify the user
        navigate('/login');  // Redirect to login page
      } else {
        alert(data.error);  // Show the error message from the server
      }
    } catch (error) {
      alert('An error occurred. Please try again.');  // Show a generic error message if the request fails
      console.error('Error during signup:', error);  // Log the error for debugging
    }
  };

  return (
    <div className='login'>
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}  // Update name state
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  // Update email state
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // Update password state
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}  // Update phone number state
      />
      <Link as={Link} to="/">
                  Home
                </Link>
      <button type="submit">Sign Up</button>  
    </form>
    </div>
  );
};

export default Signup;