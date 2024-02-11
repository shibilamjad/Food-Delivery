import { Outlet } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import { Footer } from './Footer';

export function AppLayout() {
  // const isLoading = navigation.state === 'loading';

  return (
    <div className=" grid h-screen grid-rows-[auto_1fr_auto] bg-[#f9fafb]">
      {/* {isLoading && <Loader />} */}
      {/* {true && <Loader />} */}
      <Header />

      <div className=" overflow-scroll">
        <main className=" mx-auto max-w-4xl">
          <Outlet />
        </main>
      </div>
      <Footer />
      {/* <CartOverview /> */}
    </div>
  );
}
