import { useForm } from "react-hook-form";
import { Form, StyledForm } from "../../ui/FormContainer";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Buttons";
import { useCityCreation } from "./useCityCreation";
import { Maps } from "../Restaurant/Maps";

export function CreateCity() {
  const { cityCreate, status } = useCityCreation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    cityCreate(data);
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <StyledForm>
      <h1>Create City</h1>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="City name" error={errors?.cityName?.message}>
          <Input
            type="text"
            id="cityName"
            disabled={status === "pending"}
            {...register("cityName", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <Button variation="secondary" size="xxl" type="submit">
          <Maps />
        </Button>
        <FormRow label="Latitude" error={errors?.latitude?.message}>
          <Input
            type="number"
            step="any"
            disabled={status === "pending"}
            id="latitude"
            {...register("latitude", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Longitude" error={errors?.longitude?.message}>
          <Input
            type="number"
            id="longitude"
            step="any"
            disabled={status === "pending"}
            {...register("longitude", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow>
          <Button type="reset">Cancel</Button>
          <Button disabled={status === "pending"}>Create new City</Button>
        </FormRow>
      </Form>
    </StyledForm>
  );
}
