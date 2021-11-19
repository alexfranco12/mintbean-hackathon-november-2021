import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { 
  Sidebar,
} from "..";

export const Canvas = ( ) => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [ tool, setTool ] = useState(null)
  const [ color, setColor ] = useState("black")
  const [ lineWidth, setLineWidth ] = useState(5)
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

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = document.getElementById("canvas-container").offsetWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${document.getElementById("canvas-container").offsetWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1)
    contextRef.current = context;
  }

  const updateTool = (e) => {
    const { value } = e.target;
    setTool(value)
  }

  const startDrawing = (e) => {
    if (!tool) return

    const ctx = contextRef.current
    ctx.save();

    const { nativeEvent } = e
    const { offsetX: x, offsetY: y } = nativeEvent

    switch (tool) {
      case "pencil":
        console.log("pencil")
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.moveTo(x, y)
        history.saveState(canvasRef);
        setIsDrawing(true)
        break;
      case "eraser":
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.strokeStyle = "white"
        ctx.lineWidth = lineWidth
        ctx.moveTo(x, y)
        history.saveState(canvasRef);
        setIsDrawing(true)
        break;
      case "circle":
        console.log("cirlce")
        ctx.beginPath()
        ctx.arc(x, y, (lineWidth * 11), 0, (Math.PI * 2), false);
        ctx.strokeStyle = 'black'
        ctx.lineWidth = lineWidth
        ctx.fillStyle = color
        ctx.fill()
        ctx.stroke()
        history.saveState(canvasRef);
        break;
      case "triangle":
        console.log("triangle")
        let length = lineWidth * 11
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y);
        ctx.lineTo(x, y + length);
        ctx.strokeStyle = 'black'
        ctx.lineWidth = lineWidth
        ctx.fillStyle = color
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        history.saveState(canvasRef);
        break;
      case "rectangle":
        ctx.beginPath();
        ctx.rect(x, y, 11 * lineWidth, 8 * lineWidth);
        ctx.strokeStyle = 'black'
        ctx.lineWidth = lineWidth
        ctx.fillStyle = color
        ctx.fill()
        ctx.stroke()
        break;
      default:
        console.log("pointer")
    }
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    contextRef.current.restore();
    setIsDrawing(false)
  }

  const editCanvas = ( e ) => {
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const { clientX, clientY } = e
    const x = clientX - canvasBounds.left
    const y = clientY - canvasBounds.top
    console.log(x, y)
  }

  // const editCircle = (xmouse, ymouse) => {
  //   const distance = 
  //     Math.sqrt(((xmouse - objectX) * (xmouse - objectX)) 
  //     + ((ymouse - objectY) * (ymouse - objectY)))
  //   console.log(distance)
  //   if (distance < 100) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  useEffect(() => {
    prepareCanvas();
  },[])

  return (
    <CanvasStyled>
      <div className="canvas-container" id="canvas-container">
        <canvas
          className="app-canvas"
          ref={canvasRef}
          onMouseDown={(e) => tool === "pointer" ? editCanvas(e) : startDrawing(e)}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseMove={draw}
        />
      </div>

      <div className="color-picker">
        <Sidebar 
          canvasRef={canvasRef}
          contextRef={contextRef}
          history={history}
          updateTool={updateTool}
          setColor={setColor}
          setLineWidth={setLineWidth}
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
    & .app-canvas {
      background-color: white;
      border: 2px solid black;
    }
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