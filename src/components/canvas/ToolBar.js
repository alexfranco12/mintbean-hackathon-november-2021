import styled from "styled-components";
import { ToolItem } from "./ToolItem";
import { FaUndo, FaRedo, FaHandPointer } from 'react-icons/fa';
import { RiPencilLine, RiEraserFill } from 'react-icons/ri'
import { BsSquare, BsTriangle, BsCircle } from 'react-icons/bs'

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

  return ( 
    <ToolBarStyled>

      {tools.map((tool, i) => (
        <ToolItem
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
        className="download-image"
        onClick={downloadImage}>
        download
      </button>

    </ToolBarStyled>
   );
};

const ToolBarStyled = styled.div`
  grid-column: 1 / span 9;
  grid-row: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;