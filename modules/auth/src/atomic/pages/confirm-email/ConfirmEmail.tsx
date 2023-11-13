import { ConfirmEmailProvider } from "./ConfirmEmailContext";
import ConfirmEmailApp from "./ConfirmEmailApp";
import { ComponentInject } from "@org/ui";
import { AuthTemplate } from "../../templates";
import bg from "../../../assets/images/verify-email.png";
import { PropsWithChildren } from "react";

const AuthTemplateConfirmEmail = ({ children }: PropsWithChildren) => (
  <AuthTemplate background={bg}>{children}</AuthTemplate>
);
export const ConfirmEmailPage = ComponentInject({
  template: [AuthTemplateConfirmEmail],
  providers: [ConfirmEmailProvider],
  bootstrap: ConfirmEmailApp,
});
