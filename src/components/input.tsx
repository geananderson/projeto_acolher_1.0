import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput style={style.input} placeholderTextColor="#0000005e" {...rest} />
  );
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 12,
  },
});
