import styled from "styled-components";
import { useMovies } from "./useMovies";
import { MenuRow } from "./MenuRow";
import { Loader } from "../../ui/Loader";
import { device } from "../../ui/device";

export function MenuTable() {
  const { menu, isLoading } = useMovies();

  if (isLoading) return <Loader />;
  console.log(menu);
  return (
    <Table>
      <TableHeader>
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Available</div>
        <div></div>
      </TableHeader>
      {menu.map((items) => (
        <MenuRow menu={items} key={items._id} />
      ))}
    </Table>
  );
}

const Table = styled.div`
  /* overflow: scroll;Z */
  border: 1px solid #e5e7eb;
  font-size: 1.4rem;
  background-color: #fff;
  border-radius: 7px;
  @media ${device.tablet} {
    font-size: 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    font-size: 0.6rem;
  }
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  font-weight: 600;
  color: #4b5563;
  padding: 1.6rem 2.4rem;
  @media ${device.tablet} {
    padding: 1rem 2rem;
    column-gap: 1.4rem;
    /* grid-template-columns: 1fr 1fr 0.2fr 0.2fr 0.2fr 0.6fr; */
  }
  @media ${device.mobileL} {
    padding: 0.7rem 0.6rem;
    column-gap: 0.8rem;
    /* grid-template-columns: 0.5fr 0.5fr 0.2fr 0.2fr 0.2fr 0.4fr; */
  }
`;
