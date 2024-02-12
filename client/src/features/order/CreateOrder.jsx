import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { device } from '../../ui/device';
import { useCreateOrder } from './useCreateOrder';
import { useOrder } from './useOrder';
import { Loader } from '../../ui/Loader';
import { useOrderStatus } from './useOrderStatus';
import { useNavigate } from 'react-router-dom';
import { orderStatusApi } from '../../services/apiOrder';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const navigate = useNavigate();
  const { createOrder } = useCreateOrder();
  // const { orderStatus, isLoading } = useOrderStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // async function onSubmit(data) {
  //   try {
  //     await createOrder(data);
  //     const newOrder = await orderStatusApi(data._id);
  //     navigate(`order/${newOrder._id}`);
  //   } catch (error) {
  //     // Handle errors
  //     console.error(error.message);
  //   }
  // }
  async function onSubmit(data) {
    try {
      await createOrder(data);
      // console.log(newOrder);
      // const orderID = newOrder._id; // Access the _id property of the newly created order
      // const newOrderStatus = await orderStatusApi(orderID);
      navigate('/');
    } catch (error) {
      // Handle errors
      console.error(error.message);
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <div className="h-screen px-4 py-6">
      <h2 className=" mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-5 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className=" sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              id="userName"
              {...register('userName', {
                required: 'This field is required',
              })}
            />
          </div>
        </div>
        <P>{errors?.userName?.message}</P>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="mobile"
              {...register('mobile', {
                required: 'This field is required',
                validate: (value) =>
                  isValidPhone(value) || 'Invalid phone number',
              })}
            />
          </div>
        </div>
        <P>{errors?.mobile?.message}</P>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <div className=" grow ">
            <input
              className="input w-full"
              type="text"
              name="address"
              {...register('address', {
                required: 'This field is required',
              })}
            />
          </div>

          <span className=" absolute right-0.5 top-[37px] z-50 sm:top-1 md:right-[5px] md:top-[3px]">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Get position
            </Button>
          </span>
        </div>
        <P>{errors?.address?.message}</P>
        <div>
          {/* <input type="hidden" name="cart" /> */}
          <Button type="primery">Order now</Button>
        </div>
      </form>
    </div>
  );
}
const P = styled.p`
  display: flex;
  align-items: start;
  margin-left: 170px;
  /* margin-bottom: 20px; */
  justify-content: start;
  color: red;
  @media ${device.tablet} {
    margin-left: 0px;
  }
  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;
// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),
//     priority: data.priority === 'on',
//   };

//   const errors = {};
//   if (!isValidPhone(order.phone))
//     errors.phone =
//       'Please give us your correct phone number.We might need it ti contact you ';

//   if (Object.keys(errors).length > 0) return errors;

//   const newOrder = await createOrder(order);

//   store.dispatch(clearCart());

//   return redirect(`/order/${newOrder.id}`);
// }

// export default CreateOrder;
