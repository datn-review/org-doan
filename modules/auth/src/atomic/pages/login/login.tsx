import React from "react";
import { LoginProvider } from "./login-context";
import LoginApp from "./login-app";
import { ComponentInject } from "@org/ui";
import { AuthTemplate } from "../../templates";

export const LoginPage = ComponentInject({
  template: [AuthTemplate],
  providers: [LoginProvider],
  bootstrap: LoginApp,
});
