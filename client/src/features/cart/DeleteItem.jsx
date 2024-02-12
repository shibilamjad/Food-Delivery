import Button from '../../ui/Button';
import { useDeleteCart } from './useDeleteCart';

function DeleteItem({ id }) {
  const { deleteCart } = useDeleteCart();

  return (
    <Button type="small" onClick={() => deleteCart(id)}>
      Remove
    </Button>
  );
}

export default DeleteItem;
