import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useShoppingCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const { items = [], total = 0 } = location.state || {};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Clear cart and show success message
            clearCart();
            toast.success("Order placed successfully! Thank you for your purchase. 🎮", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
            
            // Redirect to home page
            navigate("/");
        } catch (error) {
            toast.error("Failed to process payment. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!items.length) {
        return (
            <Container className="text-center mt-5">
                <h2 className="text-white">No items to checkout</h2>
                <Button 
                    variant="primary" 
                    className="mt-3"
                    onClick={() => navigate("/")}
                    style={{
                        background: '#8a2be2',
                        borderColor: '#8a2be2'
                    }}
                >
                    Return to Shop
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="text-white mb-4">Checkout</h1>
            <Row>
                <Col md={8}>
                    <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded border border-secondary">
                        <h3 className="text-white mb-4">Shipping Information</h3>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="checkout-input"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">ZIP Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h3 className="text-white mb-4 mt-5">Payment Information</h3>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                required
                                className="checkout-input"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Expiry Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">CVV</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        required
                                        className="checkout-input"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 mt-4 py-2"
                            disabled={isProcessing}
                            style={{
                                background: '#8a2be2',
                                borderColor: '#8a2be2',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isProcessing ? "Processing Order..." : `Pay ${formatCurrency(total)}`}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card className="bg-dark border border-secondary">
                        <Card.Header className="bg-dark border-bottom border-secondary">
                            <h3 className="text-white mb-0">Order Summary</h3>
                        </Card.Header>
                        <Card.Body>
                            {items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h6 className="text-white mb-0">{item.name}</h6>
                                        <small className="text-secondary">
                                            Quantity: {item.quantity}
                                        </small>
                                    </div>
                                    <span className="text-white">
                                        {formatCurrency(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))}
                            <hr className="border-secondary" />
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-white fs-5">Total:</span>
                                <span className="text-white fs-4 fw-bold">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
} 