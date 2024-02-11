import Modal from "../../ui/Modal";
import { device } from "../../ui/device";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Loader } from "../../ui/Loader";
import { useGenre } from "../genre/useGenre";

import { useMovieCreate } from "./useMovieCreate";
import { useMovieUpdate } from "./useMovieUpdate";
import { useMovieUpdateContext } from "../../context/MovieUpdateContext";
import { useNavigate } from "react-router-dom";

export function CreateMovie() {
  const navigate = useNavigate();
  const { updateMovie } = useMovieUpdate();
  const { createMovie } = useMovieCreate();
  const { genre, isLoading } = useGenre();

  const { isEditing, setIsEditing, selectedMovie, selectedMovieId } =
    useMovieUpdateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm();

  const watchImage = watch("image"); // Watch the "image" field
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setValue("image", selectedFile); // Set the value of the "image" field in the form
    }
  };

  async function onSubmit(data) {
    if (isEditing) {
      updateMovie({
        movieId: selectedMovieId,
        updateMovie: { ...data },
        onSuccess: (data) => {
          reset();
        },
      });
      navigate("/dashboard");
      setIsEditing(false);
    } else {
      await createMovie(data, {
        onSuccess: (data) => {
          reset();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading) return <Loader />;

  return (
    <Modal>
      <h1 className="p-2 text-2xl">
        {isEditing ? "Edit Movies" : "Create Movies"}
      </h1>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        encType="multipart/form-data"
      >
        <Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            {...register("image", {
              required: isEditing ? false : "This field is required",
            })}
          />
          <p>Upload image</p>

          {isEditing && (
            <Img
              key={watchImage && watchImage[0].name}
              src={selectedMovie.image}
              alt={isEditing ? "Default Image" : "Uploaded preview"}
            />
          )}
          {watchImage && watchImage.length > 0 && (
            <Img
              key={watchImage && watchImage[0].name}
              src={URL.createObjectURL(watchImage && watchImage[0])}
              alt={isEditing ? "Default Image" : "Uploaded preview"}
            />
          )}
        </Label>

        <P>{errors?.image?.message}</P>
        <div>
          <p>Title</p>
          <InputText
            type="text"
            id="title"
            defaultValue={isEditing ? selectedMovie.title : ""}
            placeholder="Tilte..."
            {...register("title", {
              required: "This field is required",
            })}
          />
          <P>{errors?.title?.message}</P>
        </div>
        <StyledRange>
          <p>Rating</p>
          <input
            type="range"
            min={1}
            max={5}
            id="ratings"
            defaultValue={isEditing ? selectedMovie.ratings : 1}
            className="range bg-slate-100 "
            {...register("ratings", { required: "This field is required" })}
          />
          <div className="w-full flex justify-between  px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </StyledRange>
        <div>
          <StyledGenre>
            {genre.map((items) => (
              <div key={items._id}>
                <input
                  type="checkbox"
                  name="genreIds"
                  value={items._id}
                  id={items._id}
                  defaultChecked={
                    isEditing &&
                    selectedMovie.genre &&
                    selectedMovie.genre
                      .map((selectedGenre) => selectedGenre._id)
                      .includes(items._id)
                  }
                  className="checkbox checkbox-secondery bg-white "
                  {...register("genre", {
                    validate: (value) => {
                      return (
                        value.length <= 4 || "Maximum 4 genres can be selected"
                      );
                    },
                  })}
                />

                <label htmlFor={items._id} className="text-2xl text-white p-2">
                  {items.title}
                </label>
              </div>
            ))}
          </StyledGenre>
          <P className="px-24">{errors?.genre?.message}</P>
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    </Modal>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

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
  }
`;
const P = styled.p`
  display: flex;
  align-items: start;
  justify-content: start;
  color: red;
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
    width: 200px;
    height: auto;
  }
  @media ${device.mobileL} {
    width: 200px;
    height: auto;
  }
  @media ${device.mobileS} {
    width: 200px;
    height: auto;
  }
  &:focus {
    outline: none;
  }
`;
const StyledRange = styled.div`
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
    width: 200px;
    height: auto;
  }
  @media ${device.mobileL} {
    width: 200px;
    height: auto;
  }
  @media ${device.mobileS} {
    width: 200px;
    height: auto;
  }
`;
const StyledGenre = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  padding: 0 90px;
  gap: 10px;
`;
