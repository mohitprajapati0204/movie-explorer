import { SnackbarProvider, closeSnackbar } from "notistack";
import AppRoutes from "./utils/Routes";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import UserConfigContext from "./contextApi/UserConfigContext";

function App() {
  return (
    <UserConfigContext>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(snackbarId) => (
          <button
            onClick={() => closeSnackbar(snackbarId)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            x
          </button>
        )}
      >
        <BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </UserConfigContext>
  );
}

export default App;
