import Button from '../../ui/Button';
import { useUpdateQuantity } from './useCartUpdate';

function UpdateCartQty({ quantity, id, onUpdateQty }) {
  return (
    <div className=" flex items-center gap-1 md:gap-2 ">
      {quantity >= 2 ? (
        <div className=" flex items-center gap-1  md:gap-2">
          <Button onClick={() => onUpdateQty(id, 'decrement')} type="round">
            -
          </Button>
          <span>{quantity}</span>
        </div>
      ) : (
        <div className=" flex items-center gap-1 md:gap-2 ">
          {' '}
          <Button disabled="disabled" type="disable">
            -
          </Button>
          <span>{quantity}</span>
        </div>
      )}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button onClick={() => onUpdateQty(id, 'increment')} type="round">
          +
        </Button>
      </div>
    </div>
  );
}

export default UpdateCartQty;
