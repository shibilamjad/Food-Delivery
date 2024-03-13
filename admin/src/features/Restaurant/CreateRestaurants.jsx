import { useForm } from "react-hook-form";
import { StyledForm, Form } from "../../ui/FormContainer";
import { useNavigate, useParams } from "react-router-dom";

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

export const CreateRestaurants = () => {
  const navigate = useNavigate();

  const { restaurantId } = useParams();
  const { isLoading, restaurantDetail } = useRestaurantId(restaurantId);
  const { createRestaurant } = useCreateRestaurants();
  const { updateRestaurant } = useUpdateRestaurants();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (restaurantDetail) {
      setValue("restaurant", restaurantDetail.restaurant || "");
      setValue("address", restaurantDetail.address || "");
      setValue("location", restaurantDetail.location || "");
      setValue("lat", restaurantDetail.lat || "");
      setValue("long", restaurantDetail.long || "");
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
    if (restaurantDetail) {
      updateRestaurant({
        restaurantId,
        updateRestaurant: data,
        onSuccess: (data) => {
          reset();
        },
      });
      navigate("/restaurants");
    } else {
      await createRestaurant(data, {
        onSuccess: (data) => {
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
          <FormRow label="Opening Time" error={errors?.openTime?.message}>
            <Input
              type="text"
              id="openTime"
              placeholder="HH:MM AM/PM"
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
              {...register("address", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="City" error={errors?.location?.message}>
            <Input
              type="text"
              id="location"
              {...register("location", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Item photo" error={errors?.image?.message}>
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              {...register("image", {
                required: restaurantDetail ? false : "This field is required",
              })}
            />
          </FormRow>
          <Button variation="primary" size="xxl" type="submit">
            {restaurantDetail ? "Edit Restaurant" : "Create Restaurant"}
          </Button>
        </Form>
      </StyledForm>
    </>
  );
};
