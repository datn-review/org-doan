import React from "react";
import { HomeProvider } from "./home-provider";
import HomeApp from "./home-app";

export function HomePage() {
  return (
    <HomeProvider>
      <HomeApp />
    </HomeProvider>
  );
}
