import { useForm } from "react-hook-form";
import { StyledForm, Form } from "../../ui/FormContainer";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Buttons";
import styled from "styled-components";
import Textarea from "../../ui/Textarea";
import { Maps } from "./Maps";
import { useEffect } from "react";
import { getAddress } from "../../service/apiGeocoding";
import { useCreateRestaurants } from "./useNewRestaurants";

export const CreateRestaurants = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm();
  const { createRestaurant } = useCreateRestaurants();
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
          ); // Customize this line based on the response structure
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateAddress();
  }, [latitude, longitude, setValue]);

  async function onSubmit(data) {
    // console.log(data);
    createRestaurant(data, {
      onSuccess(data) {
        reset();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <StyledForm>
        <h1>Create Menu</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Restaurant name" error={errors?.name?.message}>
            <Input
              type="text"
              id="restaurant"
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
              // disabled={isLoading}
              {...register("lat", {
                required: "This field is required",
              })}
            />
          </FormRow>{" "}
          <FormRow label="Longitude" error={errors?.long?.message}>
            <Input
              type="number"
              step="any"
              id="long"
              // disabled={isLoading}
              {...register("long", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Address" error={errors?.address?.message}>
            <Textarea
              type="text"
              id="address"
              // value={}
              // disabled={isWorking}
              {...register("address", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <Button variation="primary" size="xxl" type="submit">
            Create Restaurant
          </Button>
        </Form>
      </StyledForm>
    </>
  );
};
