import styled from "styled-components";
import { ToolItem } from "./ToolItem";
import { FaUndo, FaRedo, FaHandPointer } from 'react-icons/fa';
import { RiPencilLine, RiEraserFill } from 'react-icons/ri'
import { BsSquare, BsTriangle, BsCircle } from 'react-icons/bs'
import { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import axios from "axios";

const tools = [
  {
    item: "pencil",
    icon: <RiPencilLine />
  },
  { 
    item: "circle",
    icon: <BsCircle />
  },
  { 
    item: "triangle",
    icon: <BsTriangle />
  },
  { 
    item: "rectangle",
    icon: <BsSquare />
  },
  { 
    item: "pointer",
    icon: <FaHandPointer />
  },
  { 
    item: "eraser",
    icon: <RiEraserFill />
  },
]

export const ToolBar = ({ canvasRef, contextRef, history, setTool }) => {
  const { currentUser } = useContext(UserContext);
  const { NODE_ENV, REACT_APP_BACKEND, REACT_APP_HEROKU_BACKEND } = process.env

  const host = (
    NODE_ENV === "development" 
      ? REACT_APP_BACKEND : REACT_APP_HEROKU_BACKEND
  )

  const downloadImage = () => {
    let img = canvasRef.current.toDataURL("image/png");
    var link = document.createElement('a');
    link.download = "image.png";
    link.href = img;
    link.click();
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d");
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const saveImage = () => {
    let img = canvasRef.current.toDataURL("image/png");
    axios.patch(`${host}/api/users/me/${currentUser._id}/addImage`, {
      image: img
    })
  }

  return ( 
    <ToolBarStyled>

      {tools.map((tool, i) => (
        <ToolItem
          key={i}
          tool={tool.item}
          icon={tool.icon}
          setTool={setTool}
        />
      ))}

      <div className="undo-redo-container">
        <div 
          className="edit"
          onClick={() => history.undo(canvasRef, contextRef)}
        > <FaUndo />
        </div>
        <div 
          className="edit"
          onClick={() => history.redo(canvasRef, contextRef)}
        > <FaRedo />
        </div>
      </div>

      <button
        className="button clear-canvas"
        onClick={clearCanvas}
      > clear
      </button>

      <button
        className="button download-image"
        onClick={downloadImage}>
        download
      </button>

      <button
        className="button save-image"
        onClick={saveImage}>
        save
      </button>

    </ToolBarStyled>
   );
};

const ToolBarStyled = styled.div`
  grid-column: 1 / span 12;
  grid-row: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.dark3};
  & .undo-redo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    & .edit {
      margin: auto .25rem;
    }
  }
  & .button {
    margin: auto .5rem;
  }
`;