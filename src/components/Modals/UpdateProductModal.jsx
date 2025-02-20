import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useShoppingItems} from "../../context/ShoppingItemsContext.jsx";
import {toast} from 'react-toastify';
import {Zoom, Flip} from 'react-toastify';
import {Tooltip} from "react-tooltip";
import InProgressToastContent from "../InProgressToastContent.jsx";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        border: '0',
        borderRadius: 'var(--bs-border-radius)',
        boxShadow: 'var(--bs-box-shadow-lg)'
    },
};

export default function UpdateProductModal({modalIsOpen, closeModal, itemToUpdate})
{
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const {updateProduct} = useShoppingItems();
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false)
    const [isDataIdentical, setIsDataIdentical] = useState(false)

    useEffect(() =>
    {
        if (!itemToUpdate) return;
        setName(itemToUpdate.name);
        setPrice(itemToUpdate.price)
        setImageUrl(itemToUpdate.imgUrl)

    }, [itemToUpdate]);

    // Check if the new values are identical to the original ones.
    useEffect(() =>
    {
        if (!itemToUpdate) return;

        // noinspection EqualityComparisonWithCoercionJS
        setIsDataIdentical(
            itemToUpdate.name === name &&
            itemToUpdate.price == price &&
            itemToUpdate.imgUrl === imageUrl
        );
    }, [name, price, imageUrl, itemToUpdate]);

    if (!itemToUpdate) return null;

    const updateExistingProduct = async (e) =>
    {
        e.preventDefault();

        const toastId = toast(
            <InProgressToastContent icon={faSpinner} text='Update in progress...'/>,
            {autoClose: false, closeButton: false})

        setSubmitBtnDisabled(true);

        const error = await updateProduct(itemToUpdate.id, {
            name: name,
            price: price,
            imgUrl: imageUrl
        });

        setSubmitBtnDisabled(false);

        if (error)
        {
            toast.update(toastId,
                {
                    type: 'error',
                    autoClose: false,
                    render: "Error updating product: " + error.message,
                    transition: Zoom,
                    closeButton: true
                })

            return;
        }

        toast.update(toastId,
            {
                type: 'success',
                autoClose: 1500,
                render: 'Product updated successfully!',
                transition: Flip,
                closeButton: true
            })

        setIsDataIdentical(true);
        closeModal();
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Update Product Modal"
        >
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='m-0'>Update Product</h4>
                <Button className='rounded-circle' variant='outline-dark' onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark}/></Button>
            </div>

            <form autoComplete='off' onSubmit={updateExistingProduct} className='d-flex flex-column gap-3 pt-3'>

                <div className="form-group">
                    <label htmlFor="productNameInput">Name</label>
                    <input type="text"
                           className="form-control"
                           id="productNameInput"
                           placeholder="Banana"
                           autoComplete='off'
                           required
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="newProductPriceInput">Price</label>
                    <input type="number"
                           className="form-control"
                           id="newProductPriceInput"
                           autoComplete='off'
                           placeholder="$2.99"
                           min="1"
                           step="any"
                           required
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="newProductImageUrlInput">Image URL</label>
                    <input type="url"
                           className="form-control"
                           id="newProductImageUrlInput"
                           autoComplete='off'
                           value={imageUrl}
                           onChange={(e) => setImageUrl(e.target.value)}
                           placeholder="https://banana.image.url"/>
                </div>

                {/* The button is wrapped around a div because tooltips can't be shown on disabled buttons. */}
                <div data-tooltip-id='update-product-modal=submit-btn'>
                    <button disabled={submitBtnDisabled || isDataIdentical}
                            type="submit" className="btn btn-primary w-100">Update
                    </button>
                </div>
                {isDataIdentical &&
                    <Tooltip id="update-product-modal=submit-btn">No changes have been made.</Tooltip>}
            </form>
        </Modal>
    );
}