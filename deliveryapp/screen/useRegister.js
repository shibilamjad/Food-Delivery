import { useMutation, useQueryClient } from "react-query";
import { deliveryLoginApi } from "../service/authenticationApi";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: deliveryLoginApi,
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data.user);
      navigation.navigate("home");
      Alert.alert("Success", "User registered successfully!");
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });
  return { register, isLoading };
}
