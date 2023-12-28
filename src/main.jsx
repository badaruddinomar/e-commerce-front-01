import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
