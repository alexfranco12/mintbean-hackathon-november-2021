import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  username: '',
  password: '',
}

export const LoginPage = ({ setShowModal, setIsRegistered }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  let navigate = useNavigate();

  const { REACT_APP_BACKEND } = process.env

  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    axios.post(`${REACT_APP_BACKEND}/login`, {
      ...formState
    }).then((res) => {
      navigate("/profile")
      setShowModal(false)
      console.log(res)
    }).catch((err) => {
      setMessage("invalid username or password")
      console.log(err)
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
    <LoginPageStyled>
      <h1>Login</h1>
      { message && 
        <div>{message}</div>
      }
      <form 
        className="login-form"
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
            className="register-button"
            onClick={() => setIsRegistered(false)}
            > Need to register?
          </button>
          <button 
            className="submit-button"
            disabled={isSubmitting}
            > Login
          </button>
        </div>
        
      </form>
    </LoginPageStyled>
   );
};

const LoginPageStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & .login-form {
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