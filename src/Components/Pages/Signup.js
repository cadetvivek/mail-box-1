import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { NavLink,useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [err, seterr] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const email = emailRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0Y-g4td_jI-HBRPhNAnsffYhjAhuevtY",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      console.log(`${response.data.email} has successfully registered `);
      navigate("/login")
    } catch (error) {
      //   console.log(error);
      seterr(true);
    }

    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="col-3 mx-auto text-center mt-5  bg-secondary shadow-lg">
        <Card.Header>SignUp</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} />
            </Form.Group>

            <Button variant="warning" type="submit" className="m-2">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div>
          <p>
            Have an account{" "}
            <NavLink to="/login" className="text-warning">
              Login
            </NavLink>
          </p>
        </div>
        {err && <p className="text-warning">something went wrong</p>}
      </Card>
    </div>
  );
};

export default Signup;
