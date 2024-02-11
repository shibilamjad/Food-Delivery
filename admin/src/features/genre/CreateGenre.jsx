import { useForm } from "react-hook-form";

import styled from "styled-components";
import Modal from "../../ui/Modal";
import { device } from "../../ui/device";
import { Loader } from "../../ui/Loader";
import { useGenre } from "./useGenre";
import { useCreateGenre } from "./useCreateGenre";
import { useDeleleteGenre } from "./useDeleleteGenre";
import { useUpdateGenre } from "./useUpdateGenre";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";

export function CreateGenre() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGenreId, setEditingGenreId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { genre, isLoading } = useGenre();
  const { createGenre } = useCreateGenre();
  const { deleteGenre } = useDeleleteGenre();
  const { updateGenre } = useUpdateGenre();

  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    if (isEditing) {
      updateGenre({ genreId: editingGenreId, updateGenre: data });
      setIsEditing(false);
      reset();
    } else {
      createGenre(data);
    }

    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  function onEditClick(genreID) {
    setIsEditing(true);
    setEditingGenreId(genreID);
    const selected = genre.find((item) => item._id === genreID);
    setSelectedGenre(selected);
    reset();
  }
  if (isLoading) return <Loader />;

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <h1 className="p-2 text-2xl">{isEditing ? "Edit" : "Create"} Genre</h1>
        <StyledInput>
          <div>
            <InputText
              type="text"
              id="genre"
              placeholder="Create genre"
              defaultValue={isEditing ? selectedGenre.title : ""}
              {...register("genre", {
                required: "This field is required",
              })}
            />
          </div>
          <div>
            <Button>{isEditing ? "Update" : "Add"}</Button>
          </div>
        </StyledInput>
        <p>{genre.message}</p>
      </form>
      <StyledBox>
        {genre.map((items) => (
          <Box key={items._id}>
            <StyledGenre>
              <div>{items.title}</div>
            </StyledGenre>
            <StyledButton>
              <button onClick={() => onEditClick(items._id)}>
                <HiPencil />
              </button>
              <button onClick={() => deleteGenre(items._id)}>
                <HiTrash />
              </button>
            </StyledButton>
          </Box>
        ))}
      </StyledBox>
    </Modal>
  );
}

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const InputText = styled.input`
  color: #3730a3;
  border: transparent;
  padding: 5px 10px;
  border-radius: 4px;
  width: 400px;
  @media ${device.laptopL} {
    width: 400px;
    height: auto;
  }
  @media ${device.laptop} {
    width: 400px;
    height: auto;
  }
  @media ${device.tablet} {
    width: 250px;
    height: auto;
  }
  @media ${device.mobileL} {
    width: 150px;
    height: auto;
  }
  @media ${device.mobileS} {
    width: 150px;
    height: auto;
  }
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  background-color: #fff;
  color: #3730a3;
  font-weight: 500;
  padding: 5px 10px;
  border: 1px solid #3730a3;
  border-radius: 4px;
  &:hover,
  &:focus {
    background-color: #3730a3;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    transition: background-color 0.5s ease;
  }
`;
const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #fff;
  height: 100px;
`;
const StyledGenre = styled.div`
  border-bottom: 2px solid #fff;
  font-size: 20px;
  font-weight: 600;
`;
const StyledButton = styled.div`
  display: flex;
  gap: 10px;
`;
