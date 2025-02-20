import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useShoppingItems} from "../../context/ShoppingItemsContext.jsx";
import {toast} from 'react-toastify';
import {Zoom, Flip} from 'react-toastify';
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

export default function NewProductModal({modalIsOpen, closeModal})
{
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const {addProduct} = useShoppingItems();
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false)

    const addNewProduct = async (e) =>
    {
        e.preventDefault();

        const toastId = toast(
            <InProgressToastContent icon={faSpinner} text='Add in progress...'/>,
            {autoClose: false, closeButton: false})

        setSubmitBtnDisabled(true);

        const error = await addProduct({
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
                    render: "Error adding product: " + error.message,
                    transition: Zoom,
                    closeButton: true
                })

            return;
        }

        toast.update(toastId,
            {
                type: 'success',
                autoClose: 1500,
                render: 'Product added successfully!',
                transition: Flip,
                closeButton: true
            })

        setName('');
        setPrice('');
        setImageUrl('');
        closeModal();
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="New Product Modal"
        >
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='m-0'>New Product</h4>
                <Button className='rounded-circle' variant='outline-dark' onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark}/></Button>
            </div>
            <form autoComplete='off' onSubmit={addNewProduct} className='d-flex flex-column gap-3 pt-3'>

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

                <button disabled={submitBtnDisabled} type="submit" className="btn btn-primary">Add</button>
            </form>
        </Modal>
    );
}