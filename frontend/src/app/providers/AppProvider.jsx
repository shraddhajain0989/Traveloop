import { AuthProvider } from "./AuthProvider";
import { ChecklistProvider } from "./ChecklistContext";
import { ModalProvider } from "./ModalProvider";
import { NotesProvider } from "./NotesContext";
import { SettingsProvider } from "./SettingsContext";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { TripProvider } from "./TripContext";

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <TripProvider>
            <ChecklistProvider>
              <NotesProvider>
                <ToastProvider>
                  <ModalProvider>{children}</ModalProvider>
                </ToastProvider>
              </NotesProvider>
            </ChecklistProvider>
          </TripProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
