import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import Store from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ShoppingItemsProvider } from "./context/ShoppingItemsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Footer } from "./components/Footer";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <ThemeProvider>
            <ShoppingItemsProvider>
                <ShoppingCartProvider>
                    <div className="d-flex flex-column min-vh-100">
                        <Navbar />
                        <Container className="mb-4 flex-grow-1">
                            <Routes>
                                <Route path="/" element={<Store />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/checkout" element={<Checkout />} />
                            </Routes>
                        </Container>
                        <Footer />
                        <ToastContainer 
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </ShoppingCartProvider>
            </ShoppingItemsProvider>
        </ThemeProvider>
    );
}
