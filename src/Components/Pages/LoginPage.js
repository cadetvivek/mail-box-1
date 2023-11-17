import React , {useRef,useState} from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {

  const navigate=useNavigate()
  const[err,seterr]=useState(false)

  const emailRef = useRef();
  const passwordRef = useRef();


  const submitHandler = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    

    

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0Y-g4td_jI-HBRPhNAnsffYhjAhuevtY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log(response.data.idToken);
      alert(`welcome ${response.data.email}`)
      localStorage.setItem("token",response.data.idToken)
      localStorage.setItem("email",response.data.email)
      navigate("/afterLogin")
    } catch (error) {
    //   console.log(error);
    seterr(true);
    }

  passwordRef.current.value=''
  emailRef.current.value=''
  };


  return (
    <div className="d-flex justify-content-center">
      <Card className="col-3 mx-auto text-center mt-5  bg-warning shadow-lg">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}/>
            </Form.Group>

            <Button variant="dark" type="submit" className="m-2">
              Login
            </Button>
          </Form>
        </Card.Body>
        <div>
          <p>
           Dont't Have an account{' '}
            <NavLink to="/" className="text-dark">
              signUp
            </NavLink>
          </p>
        </div>
        {err && <p className='text-success'>something went wrong</p>}
      </Card>
    </div>
  );
};

