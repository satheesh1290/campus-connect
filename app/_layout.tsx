import { AuthContext } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";

interface User {
  id: number;
  email: string;
  image: string;
  name: string;
}

export default function RootLayout() {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Stack>
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/SignUp"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="(auth)/SignIn"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
      </Stack>
    </AuthContext.Provider>
  );
}
