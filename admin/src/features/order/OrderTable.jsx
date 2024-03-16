import styled from "styled-components";
import { Table, TableHeaderOrder } from "../../ui/Row";
import { useOrders } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";
import empty from "../../assets/empty.png";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SpinnerMini } from "../../ui/SpinnerMini";

export function OrderTable() {
  const { orders, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useOrders();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  const allPagesEmpty =
    orders && orders.pages.every((page) => page.length === 0);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Table role="table">
        <TableHeaderOrder>
          <div>Image</div>
          <div>Item</div>
          <div>Amt</div>
          <div>Dates</div>
          <div>Status</div>
          <div>More</div>
          <div></div>
        </TableHeaderOrder>

        <Styled>
          {allPagesEmpty ? (
            <Empty>
              <img src={empty} alt="No orders" />
            </Empty>
          ) : (
            orders &&
            orders.pages.map((page, pageIndex) =>
              page.map((order, orderIndex) => {
                const isLastOrder =
                  pageIndex === orders.pages.length - 1 &&
                  orderIndex === page.length - 1;
                return (
                  <div key={order._id} ref={isLastOrder ? ref : null}>
                    <OrderRow order={order} />
                  </div>
                );
              })
            )
          )}
          {isFetchingNextPage && (
            <StyledSpinn>
              <SpinnerMini />
            </StyledSpinn>
          )}
        </Styled>
      </Table>
    </>
  );
}

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
const StyledSpinn = styled.div`
  display: flex;
  padding-bottom: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-top: 30px;
`;
