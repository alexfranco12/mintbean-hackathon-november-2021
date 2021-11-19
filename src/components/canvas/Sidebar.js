import styled from "styled-components";
import { CirclePicker } from 'react-color'
import { FaUndo, FaRedo } from 'react-icons/fa';

const tools = [
  'pencil',
  'circle',
  'triangle',
  'rectangle',
  'pointer',
  'eraser',
]

const sizes = [
  "xSmall",
  "small",
  "medium",
  "large",
  "xLarge"
]

export const Sidebar = ({ canvasRef, contextRef, history, updateTool, setColor, setLineWidth }) => {

  const downloadImage = () => {
    let img = canvasRef.current.toDataURL("image/png");
    var link = document.createElement('a');
    link.download = "image.png";
    link.href = img;
    link.click();
  }

  const updateColor = (color) => {
    setColor(color)
  }

  const updateStroke = (e) => {
    const { value } = e.target;

    switch (value) {
      case "xSmall":
        setLineWidth(1)
        break;
      case "small":
        setLineWidth(4)
        break;
      case "large":
        setLineWidth(10)
        break;
      case "xLarge":
        setLineWidth(16)
        break;
      default:
        setLineWidth(7)
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

      <div className="tools">
        {tools.map((tool, i) => (
          <button
            className="tool"
            key={i}
            onClick={updateTool}
            value={tool}
          >{tool}
          </button>
        ))}
      </div>

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

      <h3>Stroke Size</h3>
      {sizes.map((size, i) => (
        <button 
          className="button stroke-size"
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

      <button
        className="download-image"
        onClick={downloadImage}>
        download
      </button>
      

    </SidebarStyled>
   );
};

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .tool {
    margin: 1rem .5rem;
  }
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