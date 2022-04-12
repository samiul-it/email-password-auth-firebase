import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUserWithEmailAndPassword, getAuth,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase_init';
import { useState } from "react";


const auth=getAuth(app);

function App() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [registered,setRegistered]=useState(false);

  const handleRegisteredChange=(e)=>{
    setRegistered(e.target.checked);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log("Submitted",email,password);
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log(email,password);
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
    e.preventDefault();
  }
  const verifyEmail=()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log("Verification Email Sent");
    })
  }
  const emailOnBlur=(e)=>{
    setEmail(e.target.value);
  }
  const handleForgetPassword=()=>{
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      console.log("Password Reset Email sent");
    })
  }
  const passwordOnBlur=(e)=>{
    setPassword(e.target.value);
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h2 className="text-primary">
          {" "}
          Please {registered ? "Login" : "Register"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={emailOnBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={passwordOnBlur}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredChange}
              type="checkbox"
              label="Already Registered?"
            />
          </Form.Group>
          <Button onClick={handleForgetPassword} variant="link">Forget Password? </Button>
          <p className="text-danger">{error}</p>

          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
