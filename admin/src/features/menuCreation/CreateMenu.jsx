import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import { useMenuCreate } from "./useMenuCreate";
import { useMenuUpdate } from "./useMenuUpdate";
import { useMenuEdit } from "../menu/useMenuEdit";
import { Form, StyledForm } from "../../ui/FormContainer";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { Button } from "../../ui/Buttons";
import { Loader } from "../../ui/Loader";
import { useRestaurant } from "../Restaurant/useRestaurant";
import { device } from "../../ui/device";
import { useEffect } from "react";

export function CreateMenu() {
  const { menuId } = useParams();
  const { menuEdit, isLoading } = useMenuEdit(menuId);
  const { updateMenu, isEditing } = useMenuUpdate();
  const { createMenu, isCreate } = useMenuCreate();
  const { restaurants } = useRestaurant();
  const isWorking = isCreate || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (menuEdit) {
      setValue("name", menuEdit.name || "");
      setValue("unitPrice", menuEdit.unitPrice || "");
      setValue("discount", menuEdit.discount || 0);
      setValue("ingredients", menuEdit.ingredients || "");
      setValue("isAvailable", menuEdit.isAvailable?.toString() || "");
    }
  }, [menuEdit, setValue]);

  async function onSubmit(data) {
    if (menuEdit) {
      updateMenu({
        menuId,
        updateMenu: { ...data },
        onSuccess: (data) => {
          reset();
        },
      });
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
  if (isLoading) return <Loader />;
  return (
    <StyledForm>
      <h1>{menuEdit ? "Edit Menu" : "Create Menu"}</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {!menuEdit && (
          <FormRow label="Restaurant name" error={errors?.restaurant?.message}>
            <StyledSelectContainer>
              <Controller
                name="restaurant"
                control={control}
                defaultValue={null}
                rules={{ required: "Please select a restaurant" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="basic-single"
                    classNamePrefix="select"
                    disabled={isWorking}
                    placeholder="Select Restaurant"
                    id="restaurant"
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
        )}
        <FormRow label="Item name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            defaultValue={menuEdit ? menuEdit.name : ""}
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
            defaultValue={menuEdit ? menuEdit.unitPrice : ""}
            disabled={isWorking}
            {...register("unitPrice", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            disabled={isWorking}
            defaultValue={menuEdit ? menuEdit.discount : 0}
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
            defaultValue={menuEdit ? menuEdit.ingredients : ""}
            disabled={isWorking}
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
                  id="soldOut"
                  name="availability"
                  defaultChecked={!menuEdit || !menuEdit.isAvailable}
                  value="false"
                  {...register("isAvailable")}
                />
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="isAvailable" className="cursor-pointer">
                <span className="label-text text-lg">IsAvailable</span>
                <input
                  type="radio"
                  id="isAvailable"
                  name="availability"
                  defaultChecked={menuEdit ? menuEdit.isAvailable : true} // Always default to true
                  className="radio checked:bg-blue-500"
                  value="true"
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
            disabled={isWorking}
            {...register("imageUrl", {
              required: menuEdit ? false : "This field is required",
            })}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isWorking} type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {menuEdit ? "Edit cabin" : "Create new cabin"}
          </Button>
        </FormRow>
      </Form>
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
