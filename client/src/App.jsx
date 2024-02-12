import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './ui/AppLayout';
import { Menu } from './features/menu/Menu';
import { CreateOrder } from './features/order/CreateOrder';
import { Order } from './features/order/Order';
import { Register } from './features/user/Register';
import { Home } from './ui/Home';
import { Error } from './ui/Error';
import { Cart } from './features/cart/Cart';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SignIn } from './features/user/SignIn';
import { OrderItem } from './features/order/OrderItem';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 40 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="menu" />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/new" element={<CreateOrder />} />
            <Route path="/order" element={<OrderItem />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#fff',
            color: '#272727',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
