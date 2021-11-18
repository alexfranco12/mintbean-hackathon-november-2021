import styled from "styled-components";
import { CirclePicker } from 'react-color'
import { FaUndo, FaRedo } from 'react-icons/fa';

const sizes = [
  "xSmall",
  "small",
  "medium",
  "large",
  "xLarge"
]

export const Sidebar = ({ canvasRef, contextRef, history }) => {

  const updateColor = (color) => {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color
  }

  const updateStroke = (e) => {
    const context = canvasRef.current.getContext("2d");
    const { id, value } = e.target;

    if ( id === "eraser" ) {
      context.strokeStyle = value
    } else if ( id === "size" ) {
      switch (value) {
        case "xSmall":
          context.lineWidth = 1
          break;
        case "small":
          context.lineWidth = 3
          break;
        case "large":
          context.lineWidth = 7
          break;
        case "xLarge":
          context.lineWidth = 9
          break;
        default:
          context.lineWidth = 5
      }
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d");
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return ( 
    <SidebarStyled>

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

      <h3>Color</h3>
      <CirclePicker
        className="color-picker"
        width={252}
        circleSize={28}
        circleSpacing={10}
        onChange={(color, e) => updateColor(color.hex)}
      />

      <button 
        className="button color"
        id="eraser"
        onClick={updateStroke}
        value="white"
        > eraser
      </button>

      <h3>Stroke Size</h3>
      {sizes.map((size, i) => (
        <button 
          className="button size"
          id="size"
          key={i}
          onClick={updateStroke}
          value={size}
        >{size}
        </button>
      ))}

      <button
        className="button clear-canvas"
        onClick={clearCanvas}
      > clear
      </button>

    </SidebarStyled>
   );
};

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .undo-redo-container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-bottom: 0.5rem;
    & .edit {
      border: 1px solid black;
      border-radius: 50%;
      padding: .475rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  & .color-picker {
    justify-content: center;
    & span {

    }
  }
  & .button {
    margin: 1rem auto;
    width: 60px;
  }
  & .clear-canvas {
    background-color: yellow;
  }
`;