import styled from "styled-components";

const colors = [
  "black",
  "red",
  "blue",
  "green",
  "eraser"
]

const sizes = [
  "xSmall",
  "small",
  "medium",
  "large",
  "xLarge"
]

export const ColorPicker = ({ updateStroke, clearCanvas, undoDrawing, redoDrawing }) => {
  return ( 
    <ColorPickerStyled>
      <button
        className="button clear-canvas"
        onClick={clearCanvas}
      > clear
      </button>
      
      <button 
        className="button"
        onClick={undoDrawing}
      > undo
      </button>
      <button 
        className="button"
        onClick={redoDrawing}
      > redo
      </button>

      <h3>Color</h3>
      {colors.map((color, i) => (
        <button 
          className="button color"
          id="color"
          key={i} 
          onClick={updateStroke}
          value={color}
          >{color}
        </button>
      ))}

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
    </ColorPickerStyled>
   );
};

const ColorPickerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & h3 {
    font-size: 1rem;
    text-align: center;
  }
  & .button {
    margin: 1rem auto;
    width: 60px;
  }
`;