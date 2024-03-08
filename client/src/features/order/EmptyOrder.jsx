import Button from '../../ui/Button';

export function EmptyOrder() {
  return (
    <div className="m-2 p-6 text-sm text-stone-600 ">
      <p className=" mb-6">
        Your order is still empty. Start adding some Items :)
      </p>
      <Button type="small" to="/restaurant">
        Go to Restaurant
      </Button>
    </div>
  );
}
