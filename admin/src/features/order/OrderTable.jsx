import styled from "styled-components";
import { Table, TableHeader } from "../../ui/Row";

export function OrderTable() {
  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>Image</div>
          <div>Name</div>
          <div>Qty</div>
          <div>Dates</div>
          <div>Status</div>
          <div></div>
        </TableHeader>
      </Table>

      {/* {bookings.map((booking) => (
        <BookingRow
          booking={booking} // Use singular 'booking' instead of 'bookings'
          key={booking.id}
        />
      ))} */}
      {/* <Footer>
        <Pagination count={count} />
      </Footer> */}
    </>
  );
}
