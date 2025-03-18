import { Home } from "@/pages/home";
import { Memorize } from "@/pages/memorize";
import { BrowserRouter, Route, Routes } from "react-router";
import '@/index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memorize" element={<Memorize />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
