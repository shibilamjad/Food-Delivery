import { Loader } from '../../ui/Loader';
import { MenuItem } from './MenuItem';
import { useMenu } from './useMenu';

export function Menu() {
  const { menu, isLoading } = useMenu();
  if (isLoading) return <Loader />;
  return (
    <ul className=" divide-y divide-stone-200 px-2">
      {menu.map((items) => (
        <MenuItem items={items} key={items._id} />
      ))}
    </ul>
  );
}
