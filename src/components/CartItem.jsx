import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

export function CartItem({ id, quantity }) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, getItem } = useShoppingCart();
    const item = getItem(id);
    if (!item) return null;

    return (
        <Stack direction="horizontal" gap={2} className="cart-item p-3 rounded">
            <img
                src={item.imgUrl}
                alt={item.name}
                style={{ 
                    width: "100px", 
                    height: "75px", 
                    objectFit: "cover",
                    borderRadius: "0.5rem"
                }}
            />
            <div className="me-auto">
                <div className="text-white fw-medium">
                    {item.name}
                    {quantity > 1 && (
                        <span className="text-secondary ms-1" style={{ fontSize: "0.85rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-secondary" style={{ fontSize: "0.85rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div className="d-flex flex-column align-items-end gap-1">
                <div className="d-flex align-items-center gap-1">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => decreaseCartQuantity(id)}
                        className="cart-btn"
                    >
                        −
                    </Button>
                    <span className="text-white fw-medium" style={{ minWidth: "1.5rem", textAlign: "center" }}>
                        {quantity}
                    </span>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => increaseCartQuantity(id)}
                        className="cart-btn"
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => removeFromCart(id)}
                    className="cart-remove-btn"
                >
                    Remove
                </Button>
            </div>
        </Stack>
    );
}