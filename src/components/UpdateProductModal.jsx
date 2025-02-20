import { Modal, Button, Form } from "react-bootstrap";
import { useShoppingItems } from "../context/ShoppingItemsContext";
import { useState } from "react";

export function UpdateProductModal({ show, handleClose, product }) {
    const { updateProduct } = useShoppingItems();
    const [formData, setFormData] = useState({
        name: product?.name || "",
        price: product?.price || "",
        imgUrl: product?.imgUrl || ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(product.id, formData);
            handleClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="dark-theme">
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="url"
                            name="imgUrl"
                            value={formData.imgUrl}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
} 