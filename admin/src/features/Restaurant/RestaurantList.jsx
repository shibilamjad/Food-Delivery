import { HiPencil, HiTrash } from "react-icons/hi2";
import {
  Address,
  EditSection,
  StyledButton,
  StyledIcon,
  TableRowRestaurant,
  Title,
} from "../../ui/TableRowUi";

export function RestaurantList({ restaurants }) {
  const { restaurant: name, address } = restaurants;
  console.log(name);
  return (
    <TableRowRestaurant>
      <li></li>
      <Title>{name}</Title>
      <Address>{address}</Address>
      <StyledIcon>
        <StyledButton>
          <EditSection>
            <HiPencil />
          </EditSection>
        </StyledButton>

        <StyledButton>
          <EditSection>
            <HiTrash />
          </EditSection>
        </StyledButton>
      </StyledIcon>
    </TableRowRestaurant>
  );
}
