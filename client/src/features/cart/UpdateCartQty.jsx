import Button from '../../ui/Button';

function UpdateCartQty() {
  return (
    <div className=" flex items-center gap-1 md:gap-2 ">
      {/* {!decItem ? (
        <div className=" flex items-center gap-1  md:gap-2">
          <Button type="round">-</Button>
          <span>qty</span>
        </div>
      ) : (
        <div className=" flex items-center gap-1 md:gap-2 ">
          {' '}
          <Button disabled="disabled" type="disable">
            -
          </Button>
          <span>{currentQty}</span>
        </div>
      )} */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button type="round">+</Button>
      </div>
    </div>
  );
}

export default UpdateCartQty;
