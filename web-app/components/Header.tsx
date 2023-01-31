import { ConnectKitButton } from "connectkit";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="flex justify-end gap-5 p-5">
      <ConnectKitButton />
      <ThemeSwitch />
    </header>
  );
}
