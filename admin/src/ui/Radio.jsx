import styled from "styled-components";

const StyledRadio = styled.label`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px; /* Adjust spacing between radio buttons if needed */
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const Checkmark = styled.span`
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;

  &::after {
    content: "";
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 50%;
  }
`;

export function Radio() {
  return (
    <StyledRadio>
      <input
        type="radio"
        name="radio-10"
        className="radio checked:bg-blue-500"
      />
      <Checkmark />
    </StyledRadio>
  );
}

export default Radio;
