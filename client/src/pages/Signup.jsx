import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import './loginAndSignup.css'
import logoImg from '../../public/imgs/Logo.png'

const Signup = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    //  confirmPassword: "",
    role: "",
  });

  const [confirm, setConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleConfirmChange = (event) => {
    const { value } = event.target;
    setConfirm(value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);

    // check that field Password and Confirm password are equal 
    if (confirm !== formState.password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage('');

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className='logo-img'>
            <img src={logoImg} alt='Logo' />
          </div>
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your Full Name"
                  name="fullName"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirm}
                  onChange={handleConfirmChange}
                />
                <div className="form-input">
                  <span>Role: </span>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Leader"
                      checked={formState.role === "Leader"}
                      onChange={handleChange}
                    />{" "}
                    Leader
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Student"
                      checked={formState.role === "Student"}
                      onChange={handleChange}
                    />{" "}
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Guardian"
                      checked={formState.role === "Guardian"}
                      onChange={handleChange}
                    />{" "}
                    Guardian
                  </label>
                </div>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {error && (
              <div style={{ color: 'red' }} className="my-3 p-3 bg-danger text-white">
                {error.message}

              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Signup;
