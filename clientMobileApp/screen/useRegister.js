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
      Alert.alert("Success", "User registered successfully!");
      navigation.navigate("home");
    },
    onError: (err) => {
      // Show error message using Alert
      Alert.alert("Error", err.message);
    },
  });

  return { register, isLoading };
}
