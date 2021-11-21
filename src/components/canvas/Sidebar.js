import styled from "styled-components";
import { CirclePicker } from 'react-color'

const sizes = [
  "xSmall",
  "small",
  "medium",
  "large",
  "xLarge"
]

export const Sidebar = ({ setColor, setLineWidth }) => {

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

  return ( 
    <SidebarStyled>

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