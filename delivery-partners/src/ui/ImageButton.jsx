import { useEffect, useState } from "react";
import styled from "styled-components";

export function ImageButton() {
  const [addImage, setAddImage] = useState(null);

  function handleAddimg(e) {
    const selectedFile = e.target.files[0];
    setAddImage(selectedFile);
  }

  return (
    <>
      <button>
        <Label>
          <Input type="file" accept="image/*" onChange={handleAddimg} />
          <p>Upload image</p>
          {addImage && (
            <Img src={URL.createObjectURL(addImage)} alt={addImage.name} />
          )}
        </Label>
      </button>
    </>
  );
}

const Input = styled.input`
  position: absolute;
  top: -1000px;
`;
const Img = styled.img`
  position: absolute;
  /* object-fit: contain; */
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 200px;
  height: 260px;
  margin: 20px;
  border: 1px solid rgba(238, 216, 192, 1);
  color: rgba(238, 216, 192, 1);
  color: rgba(238, 216, 192, 1);

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 120px;
    opacity: 0.2;
  }
`;
