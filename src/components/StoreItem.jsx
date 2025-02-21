import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

export function StoreItem({ id, name, price, imgUrl, brand, category, description, rating, stock }) {
    const { getItemQuantity, increaseCartQuantity } = useShoppingCart();
    const [showModal, setShowModal] = useState(false);
    const [imageError, setImageError] = useState(false);
    const quantity = getItemQuantity(id);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <div className="product-card">
                <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                    <div className="product-image-container">
                        {!imageError ? (
                            <img 
                                src={imgUrl} 
                                alt={name} 
                                className="product-image" 
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="product-image-unavailable">
                                Image Unavailable
                            </div>
                        )}
                    </div>
                    <div className="product-details">
                        <div className="product-info">
                            <h5 className="product-name">{name}</h5>
                            <div className="product-price">{formatCurrency(price)}</div>
                        </div>
                        <div className="product-actions">
                            {!imageError ? (
                                <Button 
                                    className="btn btn-primary w-100"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        increaseCartQuantity(id);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <div className="unavailable-button">
                                    Unavailable
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)}
                size="lg"
                centered
                className="product-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!imageError ? (
                        <img src={imgUrl} alt={name} className="product-modal-image" onError={handleImageError} />
                    ) : (
                        <div className="product-modal-image-unavailable">
                            Image Unavailable
                        </div>
                    )}
                    <div className="product-modal-price">{formatCurrency(price)}</div>
                    <div className="product-modal-info">
                        <div className="product-modal-info-item">
                            <strong>Brand</strong>
                            {brand}
                        </div>
                        <div className="product-modal-info-item">
                            <strong>Category</strong>
                            {category}
                        </div>
                        <div className="product-modal-info-item">
                            <strong>Rating</strong>
                            {rating} / 5
                        </div>
                        <div className="product-modal-info-item">
                            <strong>Stock</strong>
                            {stock} units
                        </div>
                    </div>
                    <p className="product-modal-description">{description}</p>
                    {!imageError && (
                        <Button 
                            className="btn btn-primary w-100"
                            onClick={() => {
                                increaseCartQuantity(id);
                                setShowModal(false);
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
