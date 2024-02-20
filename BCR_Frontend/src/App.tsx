import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import router from "src/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import ThemeProviderWrapper from "src/theme/ThemeProvider";

function App() {
  const content = useRoutes(router);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProviderWrapper>
        <CssBaseline />
        {content}
      </ThemeProviderWrapper>
    </LocalizationProvider>
  );
}
export default App;
