import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './custom.css'
import "swiper/swiper-bundle.css";
import { Provider } from "react-redux";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { store } from "./store/index.ts";
import { Toaster } from "@/components/ui/sonner"
 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  
     <Provider store={store}>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
      </Provider>
      <Toaster />
  </StrictMode>,
);
