import { useMovies } from "./useMovies";
import { MenuRow } from "./MenuRow";
import { Loader } from "../../ui/Loader";
import { Table, TableHeader } from "../../ui/Row";

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
