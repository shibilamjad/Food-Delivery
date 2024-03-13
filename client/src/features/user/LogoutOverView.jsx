import { Link } from 'react-router-dom';
import Logout from './Logout';

export function LogoutOverView({ openModal }) {
  return (
    <button
      onClick={openModal}
      className=" flex items-center justify-between rounded-md bg-stone-800 p-[4px]  text-sm uppercase text-stone-200  "
    >
      Logout&rarr;
    </button>
  );
}
