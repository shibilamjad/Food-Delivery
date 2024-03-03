import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.text}>Login</Text>
        </View>
        {/* <View style={{ marginTop: 50 }}>
          <View style={styles.inputContainer}>
            <AntDesign name="mobile1" size={20} color={Colors.brand_200} />
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.input}
                  placeholder="Enter your mobile no"
                  placeholderTextColor={Colors.grey_400}
                  keyboardType="numeric"
                />
              )}
              name="mobileNo"
              defaultValue=""
            />
          </View>
        </View> */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={20} color={Colors.brand_200} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.grey_400}
                />
              )}
              name="name"
              defaultValue=""
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="password" size={20} color={Colors.brand_200} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Colors.grey_400}
                  secureTextEntry={true}
                />
              )}
              name="password"
              defaultValue=""
            />
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View>
            <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
              <Text style={{ color: Colors.brand_0 }}>Login</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate("register")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Create an Account? Register
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.grey_100,
  },
  header: {
    alignItems: "center",
  },
  text: {
    marginTop: 200,
    color: Colors.brand_0,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.grey_200,
    padding: 5,
    borderRadius: 4,
    color: Colors.grey_500,
  },
  input: { color: Colors.grey_500, width: 300, padding: 4 },
  btn: {
    backgroundColor: Colors.brand_200,
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
    fontWeight: "bold",
    marginTop: 20,
    width: 300,
    marginTop: 40,
  },
});

export default LoginScreen;