import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const initialFormState = {
  username: '',
  password: '',
}

export const RegisterPage = ({ setShowModal, setIsRegistered }) => {
  const { NODE_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  let navigate = useNavigate();

  
  const host = (
    NODE_ENV === "development" 
      ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND
  )

  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    axios.post(`${host}/api/users/register`, {
      ...formState
    }).then((res) => {
      navigate("/login")
      setShowModal(false)
    }).catch((err) => {
      setMessage("please use only letters (a-z), numbers, and underscores.")
    }).finally(() => {
      setFormState(initialFormState)
      setIsSubmitting(false)
    })
  };

  const updateFormControl = (e) => {
    const { id, value } = e.target;
    const updatedFormState = {...formState};
    updatedFormState[id] = value;
    setFormState(updatedFormState);
  };

  return ( 
    <RegisterPageStyled>
      <h1>Register</h1>
      <form 
        className="register-form"
        onSubmit={submitForm}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input 
            className="username" 
            id="username" 
            type="text"
            onChange={updateFormControl}
            value={formState.username}
          />
          {message && <div className="message">{message}</div>}
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input 
            className="password" 
            id="password" 
            type="text"
            onChange={updateFormControl}
            value={formState.password}
          />
        </div>

        <div className="buttons">
          <button
            className="login-button"
            onClick={() => setIsRegistered(true)}
            > back
          </button>
          <button 
            className="submit-button"
            disabled={isSubmitting}
            > Register
          </button>
        </div>
      </form>
    </RegisterPageStyled>
   );
};

const RegisterPageStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & .register-form {
    width: 50%;
    & .input-field {
      margin: 2rem auto;
      display: flex;
      flex-direction: column;
    }
    & .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;