import React, { PropsWithChildren } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

export function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
