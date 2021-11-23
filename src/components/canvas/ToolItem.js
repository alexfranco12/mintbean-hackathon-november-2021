import styled from "styled-components";

export const ToolItem = ({ tool, icon, setTool }) => {
  return ( 
    <ToolItemStyled>
      <button 
        className="tool"
        onClick={() => {
          setTool(tool)
          console.log("tool is "+tool)
        }}
        > {icon}
      </button>
    </ToolItemStyled>
   );
};

const ToolItemStyled = styled.div`
  & .tool {
    padding: 0.125rem 0.675rem;
    margin: auto 0.5rem;
    & svg {
      font-size: 18px;
    }
  }

`;