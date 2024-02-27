import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../service/apiAuthentication";

export function useUserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  return { users, isLoading };
}
