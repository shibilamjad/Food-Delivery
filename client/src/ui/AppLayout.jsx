import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Footer } from './Footer';

export function AppLayout() {
  // const isLoading = navigation.state === 'loading';

  return (
    <div className=" grid h-screen grid-rows-[auto_1fr_auto] bg-[rgb(255,255,253)]">
      <Header />

      <div className=" overflow-scroll">
        <main className=" mx-auto ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
