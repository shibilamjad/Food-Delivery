import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    ' text-sm inline-block rounded-full   font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:outline-none focus:ring  focus:ring-offset-2 disabled:cursor-not-allowed ';
  const style = {
    third:
      base +
      ' px-4 py-2 md:px-5 md:py-2.5 bg-green-500  hover:bg-green-400 focus:bg-green-300 focus:ring-green-300 ',
    primery:
      base +
      ' px-4 py-2 md:px-5 md:py-2.5 bg-yellow-400 focus:bg-yellow-300  hover:bg-yellow-300 focus:ring-yellow-300',
    small:
      base +
      ' px-3 py-2 md:px-5 md:py-2.5 bg-yellow-400 focus:bg-yellow-300  hover:bg-yellow-300 focus:ring-yellow-300',
    round:
      '  focus:ring-stone-200 focus:ring text-sm inline-block rounded-full bg-yellow-400  px-2 py-1 md:px-3 md:py-2',
    disable:
      ' text-sm inline-block rounded-full bg-stone-400  px-2 py-1 md:px-3 md:py-2',
    secondery:
      ' text-sm px-4 py-2 md:px-5 md:py-2.5 inline-block border-2 border-stone-300 rounded-full bg-transparent font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:text-stone-800 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed ',
    danger:
      ' text-sm px-4 py-2 md:px-5 md:py-2.5 inline-block border-2 border-stone-400 rounded-full bg-red-600 font-semibold uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:text-stone-200 hover:bg-bg-700 focus:bg-red-600 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed ',
  };
  if (to)
    return (
      <Link to={to} disabled={disabled} className={style[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
