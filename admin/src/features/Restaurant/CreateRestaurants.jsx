import { Controller, useForm } from "react-hook-form";
import { StyledForm, Form } from "../../ui/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Buttons";
import Textarea from "../../ui/Textarea";
import { Maps } from "./Maps";
import { Loader } from "../../ui/Loader";
import { useEffect } from "react";
import { getAddress } from "../../service/apiGeocoding";
import { useCreateRestaurants } from "./useNewRestaurants";
import { useRestaurantId } from "./useRestaurantId";
import { convertToAmPm } from "../../utils/convertToAmPm";
import FileInput from "../../ui/FileInput";
import { useUpdateRestaurants } from "./useUpdateRestaurants";
import { useCity } from "./useCity";
import { device } from "../../ui/device";

export const CreateRestaurants = () => {
  const navigate = useNavigate();

  const { restaurantId } = useParams();
  const { isLoading, restaurantDetail } = useRestaurantId(restaurantId);
  const { createRestaurant, isCreating } = useCreateRestaurants();
  const { updateRestaurant } = useUpdateRestaurants();
  const { getCity } = useCity();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm();
  useEffect(() => {
    if (restaurantDetail) {
      setValue("restaurant", restaurantDetail.restaurant || "");
      setValue("address", restaurantDetail.address || "");
      setValue("location", restaurantDetail.location || "");
      setValue("lat", restaurantDetail.lat || "");
      setValue("long", restaurantDetail.long || "");
      setValue("location", restaurantDetail.location?.value || "");
      setValue("openTime", convertToAmPm(restaurantDetail.openTime) || "");
      setValue("closeTime", convertToAmPm(restaurantDetail.closeTime) || "");
    }
  }, [restaurantDetail, setValue]);

  // Watch latitude and longitude fields
  const latitude = watch("lat");
  const longitude = watch("long");

  useEffect(() => {
    const updateAddress = async () => {
      if (latitude && longitude) {
        try {
          const addressData = await getAddress({ latitude, longitude });
          setValue(
            "address",
            addressData.locality +
              ", " +
              addressData.city +
              ", " +
              addressData.principalSubdivision +
              ", " +
              addressData.countryName
          );
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateAddress();
  }, [latitude, longitude, setValue]);
  async function onSubmit(data) {
    const formData = { ...data, location: data.location.value };
    if (restaurantDetail) {
      updateRestaurant({
        restaurantId,
        updateRestaurant: formData,
        onSuccess: (formData) => {
          reset();
        },
      });
      navigate("/restaurants");
    } else {
      await createRestaurant(formData, {
        onSuccess: (formData) => {
          reset();
        },
      });
      navigate("/restaurants");
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  if (isLoading) return <Loader />;
  return (
    <>
      <StyledForm>
        <h1> {restaurantDetail ? "Edit Restaurant" : "Create Restaurant"}</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Restaurant name" error={errors?.restaurant?.message}>
            <Input
              type="text"
              id="restaurant"
              disabled={isCreating === "pending"}
              {...register("restaurant", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <Button variation="secondary" size="xxl" type="submit">
            <Maps />
          </Button>
          <FormRow label="Latitude" error={errors?.lat?.message}>
            <Input
              type="number"
              step="any"
              id="lat"
              disabled={isCreating === "pending"}
              {...register("lat", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Longitude" error={errors?.long?.message}>
            <Input
              type="number"
              step="any"
              id="long"
              disabled={isCreating === "pending"}
              {...register("long", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Opening Time" error={errors?.openTime?.message}>
            <Input
              type="text"
              id="openTime"
              placeholder="HH:MM AM/PM"
              disabled={isCreating === "pending"}
              {...register("openTime", {
                required: "This field is required",
                pattern: {
                  value: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
                  message: "Please enter a valid time in HH:MM AM/PM format",
                },
              })}
            />
          </FormRow>
          <FormRow label="Closing Time" error={errors?.closeTime?.message}>
            <Input
              type="text"
              id="closeTime"
              placeholder="HH:MM AM/PM"
              disabled={isCreating === "pending"}
              {...register("closeTime", {
                required: "This field is required",
                pattern: {
                  value: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i,
                  message: "Please enter a valid time in HH:MM AM/PM format",
                },
              })}
            />
          </FormRow>
          <FormRow label="Full Address" error={errors?.address?.message}>
            <Textarea
              type="text"
              id="address"
              disabled={isCreating === "pending"}
              {...register("address", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="City" error={errors?.location?.message}>
            <StyledSelectContainer>
              <Controller
                name="location"
                control={control}
                defaultValue={
                  restaurantDetail ? restaurantDetail.location : null
                }
                rules={{ required: "Please select a city" }}
                render={({ field }) =>
                  getCity ? (
                    <Select
                      {...field}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select City"
                      id="location"
                      options={getCity.map((item) => ({
                        label: item.cityName,
                        value: item.cityName,
                      }))}
                      isClearable
                      styles={customStyles}
                    />
                  ) : (
                    <div>
                      <Loader />
                    </div>
                  )
                }
              />
            </StyledSelectContainer>
          </FormRow>
          <FormRow label="Item photo" error={errors?.image?.message}>
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              disabled={isCreating === "pending"}
              {...register("image", {
                required: restaurantDetail ? false : "This field is required",
              })}
            />
          </FormRow>
          <Button
            disabled={isCreating === "pending"}
            variation="primary"
            size="xxl"
            type="submit"
          >
            {restaurantDetail ? "Edit Restaurant" : "Create Restaurant"}
          </Button>
        </Form>
      </StyledForm>
    </>
  );
};

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
