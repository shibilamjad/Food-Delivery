import { createContext, useContext, useState } from 'react';

export const OrderStatusContext = createContext();

function OrderStatusProvider({ children }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);

  return (
    <OrderStatusContext.Provider
      value={{
        setIsEditing,
        isEditing,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
}

function useOrderStatusContext() {
  const context = useContext(OrderStatusContext);
  if (!context) {
    throw new Error(
      'useOrderStatusContext must be used with an OrderStatusProvider',
    );
  }
  return context;
}

export { OrderStatusProvider, useOrderStatusContext };
