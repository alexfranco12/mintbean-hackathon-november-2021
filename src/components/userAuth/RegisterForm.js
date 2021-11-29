import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

const initialFormState = {
  username: '',
  password: '',
}

export const RegisterForm = ({ setShowModal, setIsRegistered }) => {
  const { REACT_APP_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setCurrentUser } = useContext(UserContext);
  const [message, setMessage] = useState(null)
  const host = REACT_APP_ENV === "development" 
      ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND

  let navigate = useNavigate();

  
  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    axios.request({
      method: "POST",
      url: `${host}/api/users/register`,
      data: {
        ...formState
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
    }).then((res) => {
      console.log("register: ", res)
      setCurrentUser(res.data)
      setShowModal(false)
      navigate(`/profile`)
    }).catch((err) => {
      console.log(err)
      setMessage("username already exists")
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
    <RegisterFormStyled>
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
            type="password"
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
    </RegisterFormStyled>
   );
};

const RegisterFormStyled = styled.div`
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