import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { useMenuUpdateContext } from "../../context/MenuUpdateContext";
import { useMenuCreate } from "./useMenuCreate";
import { useMenuUpdate } from "./useMenuUpdate";
import { Form, StyledForm } from "../../ui/FormContainer";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { Button } from "../../ui/Buttons";
import { Loader } from "../../ui/Loader";
import { useRestaurant } from "../Restaurant/useRestaurant";
import { device } from "../../ui/device";

export function CreateMenu() {
  const navigate = useNavigate();
  const { updateMenu } = useMenuUpdate();
  const { createMenu, isCreate } = useMenuCreate();
  const { restaurants, isLoading } = useRestaurant();
  const { isEditing, setIsEditing, selectedMenu, selectedMenuId } =
    useMenuUpdateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    control,
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
      navigate("/menuItem");
      setIsEditing(false);
    } else {
      await createMenu(data, {
        onSuccess: (data) => {
          reset();
          navigate("/menuItem");
        },
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  if (isLoading) return <Loader />;
  return (
    <StyledForm>
      <h1>{isEditing ? "Edit Menu" : "Create Menu"}</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Restaurant name" error={errors?.restaurant?.message}>
          <StyledSelectContainer>
            <Controller
              name="restaurant"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a restaurant" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select Restaurant"
                  id="restaurant"
                  defaultValue={isEditing ? selectedMenu.restaurant : ""}
                  options={restaurants.map((item) => ({
                    value: item._id,
                    label: item.restaurant,
                  }))}
                  isClearable
                  styles={customStyles}
                />
              )}
            />
          </StyledSelectContainer>
        </FormRow>
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
          <Button disabled={isCreate} type="reset">
            Cancel
          </Button>
          <Button disabled={isCreate}>
            {/* {isEditSession ? "Edit cabin" : "Create new cabin"}</Button> */}
            Create Item
          </Button>
        </FormRow>
      </Form>{" "}
    </StyledForm>
  );
}
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-grey-0)",
    border: " 1px solid var(--color-grey-200)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--color-brand-500)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-brand-200)",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--color-brand-200)",
  }),
};

const StyledRadio = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  span {
    color: var(--color-indigo-500);
    margin-right: 6px;
  }
`;

const StyledSelectContainer = styled.div`
  width: 300px;
  color: red;
  .basic-single {
    color: red;
    color: var(--color-brand-500);
  }

  @media ${device.tablet} {
    width: 250px;
    /* padding: 0.5rem 0.8rem; */
  }
  @media ${device.mobileL} {
    width: 150px;
    /* padding: 0.4rem 0.8rem; */
  }
  @media ${device.mobileS} {
    width: 140px;
    /* padding: 0.4rem 0.8rem; */
  }
`;
