import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ColorPicker } from "..";

export const Canvas = ( ) => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [ isDrawing, setIsDrawing ] = useState(false)
  const [ undoList, setUndoList ] = useState([])
  const [ redoList, setRedoList ] = useState([])

  var history = {
    saveState: function(canvasRef, list, keep_redo) {
      keep_redo = keep_redo || false;
      if (!keep_redo) setRedoList([]);
      list ? list.push([...list, canvasRef.current.toDataURL()])
            : setUndoList([...undoList, canvasRef.current.toDataURL()])
    },
    undo: function(canvasRef, contextRef) {
      this.restoreState(canvasRef, contextRef, undoList, redoList);
    },
    redo: function(canvasRef, contextRef) {
      this.restoreState(canvasRef, contextRef, redoList, undoList);
    },
    restoreState: function(canvasRef, contextRef, pop, push) {
      if(pop.length) {
        this.saveState(canvasRef, push, true);
        var restore_state = pop.pop();
        var img = new Image()
        img.src = restore_state
        img.onload = function() {
          contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          contextRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height, 0, 0, canvasRef.current.width, canvasRef.current.height);  
        }
      }
    }
  }

  const updateStroke = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    const canvas = canvasRef.current
    const context = canvas.getContext("2d");

    if ( id === "color" ) {
      value !== "eraser"
        ? context.strokeStyle = value
        : context.strokeStyle = "white"
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

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = document.getElementById("canvas-container").offsetWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${document.getElementById("canvas-container").offsetWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    history.saveState(canvasRef);
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const undoDrawing = () => {
    history.undo(canvasRef, contextRef);
  }

  const redoDrawing = () => {
    history.redo(canvasRef, contextRef)
  }

  useEffect(() => {
    prepareCanvas();
  },[])

  return (
    <CanvasStyled>
      <div className="canvas-container" id="canvas-container">
        <canvas
          className="app-canvas"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseMove={draw}
        />
      </div>

      <div className="color-picker">
        <ColorPicker 
          updateStroke={updateStroke} 
          clearCanvas={clearCanvas}
          undoDrawing={undoDrawing}
          redoDrawing={redoDrawing}
        />
      </div>
      
    </CanvasStyled>
   );
};

const CanvasStyled = styled.div`
  grid-column: 2 / span 12;
  grid-row: 2;
  display: flex;
  & .canvas-container {
    flex: 4;
    background-color: white;
  }
  & .color-picker {
    flex: 1;
  }

  @media ${props => props.theme.breakpoints.tablet} {
    grid-column: 2 / span 6;
    grid-row: 2;
    display: flex;
  }
  
  @media ${props => props.theme.breakpoints.mobile} {
  }
  
`;