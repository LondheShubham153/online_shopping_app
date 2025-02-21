import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useShoppingItems } from "../context/ShoppingItemsContext";

export function ShoppingCart() {
    const { closeCart, cartItems, clearCart, isOpen } = useShoppingCart();
    const { products } = useShoppingItems();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const total = cartItems.reduce((total, cartItem) => {
        const product = products.find(p => p.id === cartItem.id);
        return total + (product?.price || 0) * cartItem.quantity;
    }, 0);

    const cartItemsWithDetails = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...item,
            name: product?.name || "",
            price: product?.price || 0,
            imgUrl: product?.imgUrl || ""
        };
    });

    const handleCheckout = () => {
        try {
            setIsCheckingOut(true);
            navigate("/checkout", { 
                state: { 
                    items: cartItemsWithDetails,
                    total: total 
                }
            });
            closeCart();
        } catch (error) {
            toast.error("Checkout failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end" className="cart-panel">
            <Offcanvas.Header closeButton className="border-bottom border-secondary">
                <Offcanvas.Title>
                    <span className="text-white fs-4 fw-bold">Shopping Cart</span>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
                <Stack gap={3} className="flex-grow-1">
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </Stack>
                {cartItems.length > 0 ? (
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3 border-top border-secondary pt-3">
                            <span className="text-white fs-5">Total:</span>
                            <span className="text-white fs-4 fw-bold">
                                {formatCurrency(total)}
                            </span>
                        </div>
                        <Button
                            variant="primary"
                            className="w-100 mb-2 py-2"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            style={{
                                background: '#8a2be2',
                                borderColor: '#8a2be2',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isCheckingOut ? (
                                <span>Processing...</span>
                            ) : (
                                <span className="d-flex align-items-center justify-content-center gap-2">
                                    Proceed to Checkout
                                </span>
                            )}
                        </Button>
                        <Button
                            variant="outline-light"
                            className="w-100 py-2"
                            onClick={() => {
                                clearCart();
                                toast.info("Cart cleared!", {
                                    position: "top-right",
                                    autoClose: 2000,
                                    theme: "dark"
                                });
                            }}
                            disabled={isCheckingOut}
                            style={{
                                borderColor: '#fff',
                                color: '#fff',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Clear Cart
                        </Button>
                    </div>
                ) : (
                    <div className="text-center mt-4">
                        <span className="text-white fs-5">Your cart is empty</span>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}
