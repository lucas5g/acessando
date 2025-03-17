import { Home } from "@/pages/home";
import { Memorize } from "@/pages/memorize";
import { BrowserRouter, Route, Routes } from "react-router";
import '@/index.css'
export function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/memorize" element={<Memorize />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
