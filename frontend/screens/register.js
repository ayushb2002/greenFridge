import axios from "axios";
import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

export default class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  Register = async ({ navigation }) => {
    if (
      !this.state.email ||
      !this.state.password ||
      !this.state.username ||
      !this.state.firstName ||
      !this.state.lastName
    ) {
      console.log("Empty Fields");
      return;
    }

    try {
      const resp = await axios.post(
        "http://10.21.85.114:8000/api/auth/register",
        {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
        }
      );

      console.log(resp.data);
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("firstName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("lastName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("password", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => this.onChangeText("email", val)}
        />
        <Button title="Sign Up" onPress={this.Register} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
