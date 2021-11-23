import { useState } from "react";
import styled from "styled-components";
import { LoginPage, RegisterPage } from '../pages'

export const Modal = ({ showModal, setShowModal }) => {
  const [isRegistered, setIsRegistered] = useState(true)
  return ( 
    <ModalStyled style={{display: showModal ? 'block' : 'none' }}>
      <div className="modal__container">
        <button 
          className="modal__button" 
          onClick={() => {
            setShowModal(prev => !prev)
            setIsRegistered(true)
          }}
          >CLOSE
        </button>
        <div className="content">
          { (!isRegistered) 
            ? <RegisterPage setIsRegistered={setIsRegistered} setShowModal={setShowModal} />
            : <LoginPage setIsRegistered={setIsRegistered} setShowModal={setShowModal} />
          }
        </div>
      </div>
    </ModalStyled>
   );
};

const ModalStyled = styled.div`
  position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: auto;
  background-color: rgba(242, 200, 75, .75);
  z-index: 5;
  .modal__container {
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.primary1};
    text-align: justify;
    width: 80%;
    height: fit-content;
    border-radius: 5px;
    margin: 10vh auto;
    box-shadow: 0 3px 3px black;
    padding: 4% 6%;
    z-index: 10;
    .modal__button {
      align-self: flex-end;
      padding: 10px;
      height: auto;
      width: 80px;
      border: 1px solid;
      border-radius: 4px;
      outline: none;
      background-color: ${props => props.theme.colors.secondary2};
      color: ${props => props.theme.colors.dark1};
      cursor: pointer;
    }
    & .content {
      display: flex;
      margin-top: 2rem;
    }
  }
  
`;