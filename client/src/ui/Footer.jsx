import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-2 text-base text-sm uppercase text-stone-200 sm:md:mt-1">
      {/* Render cart information */}
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        {/* <span>{cartTotoalPizzas} pizzas</span> */}
        {/* <span>${cartTotoalPrice}</span> */}
      </p>

      {/* Link to open cart */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
