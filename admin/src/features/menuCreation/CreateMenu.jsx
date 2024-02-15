import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMenuUpdateContext } from "../../context/MenuUpdateContext";
import { useMenuCreate } from "./useMenuCreate";
import { useMenuUpdate } from "./useMenuUpdate";
import { device } from "../../ui/device";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Buttons from "../../ui/Buttons";

export function CreateMenu() {
  const navigate = useNavigate();
  const { updateMenu } = useMenuUpdate();
  const { createMenu } = useMenuCreate();

  const { isEditing, setIsEditing, selectedMenu, selectedMenuId } =
    useMenuUpdateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  async function onSubmit(data) {
    if (isEditing) {
      updateMenu({
        menuId: selectedMenuId,
        updateMenu: { ...data },
        onSuccess: (data) => {
          reset();
        },
      });
      navigate("/dashboard");
      setIsEditing(false);
    } else {
      await createMenu(data, {
        onSuccess: (data) => {
          reset();
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledForm>
      <h1>{isEditing ? "Edit Menu" : "Create Menu"}</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Item name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            defaultValue={isEditing ? selectedMenu.name : ""}
            // disabled={isWorking}
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Regular price" error={errors?.unitPrice?.message}>
          <Input
            type="number"
            id="unitPrice"
            defaultValue={isEditing ? selectedMenu.unitPrice : ""}
            // disabled={isLoading}
            {...register("unitPrice", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            // disabled={isWorking}
            defaultValue={isEditing ? selectedMenu.discount : 0}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                +value <= getValues().unitPrice ||
                "Discount should be less than regular price",
            })}
          />
        </FormRow>

        <FormRow label="Ingredients" error={errors?.ingredients?.message}>
          <Textarea
            type="number"
            id="ingredients"
            defaultValue={isEditing ? selectedMenu.ingredients : ""}
            // disabled={isWorking}
            {...register("ingredients", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Item Available">
          <StyledRadio>
            <div className="form-control">
              <label htmlFor="soldOut" className="cursor-pointer">
                <span className="label-text text-lg">SoldOut</span>
                <input
                  type="radio"
                  id="soldOut" // Unique ID
                  name="availability" // Same name for both radio buttons
                  defaultChecked={!isEditing || !selectedMenu.isAvailable} // If not editing or menu is not available
                  className="radio checked:bg-red-500"
                  value="false" // Value for "SoldOut"
                  {...register("isAvailable")}
                />
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="isAvailable" className="cursor-pointer">
                <span className="label-text text-lg">IsAvailable</span>
                <input
                  type="radio"
                  id="isAvailable" // Unique ID
                  name="availability" // Same name for both radio buttons
                  defaultChecked={
                    isEditing ? isEditing && selectedMenu.isAvailable : true
                  } // Always default to true
                  className="radio checked:bg-blue-500"
                  value="true" // Value for "IsAvailable"
                  {...register("isAvailable")}
                />
              </label>
            </div>
          </StyledRadio>
        </FormRow>

        <FormRow label="Item photo" error={errors?.imageUrl?.message}>
          <FileInput
            type="file"
            id="imageUrl"
            accept="image/*"
            {...register("imageUrl", {
              required: isEditing ? false : "This field is required",
            })}
          />
        </FormRow>
        <FormRow>
          {/* type is an HTML attribute! */}
          <Buttons type="reset">Cancel</Buttons>
          <Buttons>
            {/* {isEditSession ? "Edit cabin" : "Create new cabin"}</Button> */}
            Create new cabin
          </Buttons>
        </FormRow>
      </Form>{" "}
    </StyledForm>
  );
}
const StyledRadio = styled.div`
  display: flex;
  flex-wrap: wraps;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  span {
    color: var(--color-indigo-500);
    margin-right: 6px;
  }
`;
const StyledForm = styled.div`
  padding: 2.4rem 4rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: 10px;
  color: var(--color-brand-200);
  @media ${device.tablet} {
    padding: 1.4rem 2.5rem;
  }
  @media ${device.mobileL} {
    padding: 1rem 2rem;
  }
  h1 {
    font-size: 40px;
    font-weight: 600;
    padding-left: 20px;
    margin: 10px;
    @media ${device.tablet} {
      font-size: 30px;
      font-weight: 600;
      padding-left: 10px;
      margin: 10px;
    }
    @media ${device.mobileL} {
      font-size: 20px;
      font-weight: 600;
      padding-left: 1px;
      margin: 10px;
    }
  }
`;

const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  font-size: 1.4rem;
  width: 1000px;
  @media ${device.laptopL} {
    font-size: 1.2rem;
    padding: 1rem 1rem;
    width: 600px;
  }
  @media ${device.laptop} {
    width: 400px;
  }
  @media ${device.tablet} {
    width: 300px;
  }
  @media ${device.mobileL} {
    width: 240px;
  }
  @media ${device.mobileS} {
    width: 200px;
  }
`;
