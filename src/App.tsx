import { Home } from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import '@/index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Memorize } from "./pages/Memorize";
import { Ponto } from "@/pages/Ponto";
import { Server } from "@/pages/Ponto/Server";

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memorize" element={<Memorize />} />

          <Route key={'/pontos'} path='/pontos' element={<Ponto />} />,
          <Route key={'/pontos/servidores'} path='/pontos/servidores' element={<Server />} />

          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
