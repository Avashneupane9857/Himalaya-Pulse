import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import Reports from "./components/Reports";
import ContactUs from "./components/ContactUs";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
