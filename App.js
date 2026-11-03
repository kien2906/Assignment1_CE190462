import Navigation from "./src/Navigation/Navigation";
import { SettingsProvider } from "./src/Context/SettingsContext";

export default function App() {
  return (
    <SettingsProvider>
      <Navigation />
    </SettingsProvider>
  );
}
