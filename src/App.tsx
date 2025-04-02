import { Home } from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Memorize } from "./pages/Memorize";
import { generateRoutes } from "./components/GenerateRoutes";
import { pontosMenus } from "./pages/Ponto";
import '@/index.css'

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memorize" element={<Memorize />} />
          {generateRoutes(pontosMenus)}
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
