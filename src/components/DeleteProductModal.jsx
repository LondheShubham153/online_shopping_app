import { Modal, Button } from "react-bootstrap";
import { useShoppingItems } from "../context/ShoppingItemsContext";

export function DeleteProductModal({ show, handleClose, productId }) {
    const { deleteProduct } = useShoppingItems();

    const handleDelete = async () => {
        try {
            await deleteProduct(productId);
            handleClose();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="dark-theme">
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
} 