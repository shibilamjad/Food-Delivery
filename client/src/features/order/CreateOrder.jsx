import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  // if (!cart.length) return <EmptyCart />;

  return (
    <div className="   h-screen px-4 py-6">
      <h2 className=" mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <form method="POST">
        <div className="mb-5 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className=" sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              name="customer"
              required
              // defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Phone number</label>
          <div className="grow ">
            <input className="input w-full " type="tel" name="phone" required />
            {/* {formError?.phone && (
              <p
                className=" mt-2 rounded-md bg-red-100 p-2 text-xs
               text-red-700 sm:basis-40"
              >
                {formError.phone}
              </p>
            )} */}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <div className=" grow ">
            <input
              className="input w-full"
              type="text"
              name="address"
              // disabled={isLoadingAddress}
              // defaultValue={address}
              required
            />
            {/* {addressStatus === 'error' && (
              <p
                className=" mt-2 rounded-md bg-red-100 p-2 text-xs
               text-red-700 sm:basis-40"
              >
                {errorAddress}
              </p>
            )} */}
          </div>
          <span className=" absolute right-0.5 top-[4.5px] z-50 md:right-[5px] md:top-[5px]">
            <Button
              // disabled={isLoadingAddress}
              type="small"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Get position
            </Button>
          </span>
        </div>

        <div className="  mb-6 flex items-center gap-4">
          <input
            className=" mx-1 h-4 w-4 accent-yellow-400 hover:ring-[0.1rem]
             hover:ring-yellow-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className=" text-stone-00 font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" />
          <Button type="primery">Order now</Button>
        </div>
      </form>
    </div>
  );
}

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
