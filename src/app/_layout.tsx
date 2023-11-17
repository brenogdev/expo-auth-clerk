import { useEffect } from "react";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { CLERK_PUBLISHABLE_KEY } from "../constants/clerkKey";
import { Slot, useRouter, useSegments } from "expo-router";

import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      return;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (error) {
      return null;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segmentes = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inTabsGroup = segmentes[0] === "(auth) ";

    if (!isLoaded) return;

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;
