import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuth } from 'firebase/auth';
import app from './firebase_init';


const auth=getAuth(app);

function App() {
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Submitted");
  }
  const emailOnBlur=(e)=>{
    console.log(e.target.value);
  }
  const passwordOnBlur=(e)=>{
    console.log(e.target.value);
  }
  return (
    <div >
      <div className="registration w-50 mx-auto mt-5">
        <h2 className="text-primary"> Please Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={emailOnBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={passwordOnBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
