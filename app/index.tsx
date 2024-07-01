import { Text, View } from "react-native";
import {login, register} from "@/src/lib/auth";
import {Button} from "@rneui/base";

export default function Index() {
    const handleLogin = () => {
        login("rthomlinson03@gmail.com", "SpringTest1!").then(console.log).catch(console.log)
    }

    const handleRegister = () => {
        register("rthomlinson03@gmail.com", "SpringTest1!").then(console.log).catch(console.log)
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button onPress={handleLogin}>Login</Button>
        <Button onPress={handleRegister}>Register</Button>
    </View>
  );
}
