import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
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
        boxShadow: 'var(--bs-box-shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
};

export default function DeleteProductModal({modalIsOpen, closeModal, itemToUpdate})
{
    const {deleteProduct} = useShoppingItems();
    // const toastId = useRef(null);

    if (!itemToUpdate) return;

    const confirmDeleteProduct = async (e) =>
    {
        e.preventDefault();

        const toastId = toast(
            <InProgressToastContent icon={faSpinner} text='Delete in progress...'/>,
            {autoClose: false, closeButton: false})

        closeModal();

        const error = await deleteProduct(itemToUpdate.id);

        if (error)
        {
            toast.update(toastId,
                {
                    type: 'error',
                    autoClose: false,
                    render: "Error deleting product: " + error.message,
                    transition: Zoom,
                    closeButton: true
                })

            return;
        }

        toast.update(toastId,
            {
                type: 'success',
                autoClose: 1500,
                render: 'Product deleted successfully!',
                transition: Flip,
                closeButton: true
            })
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Delete Product Modal">

            <h5 className='m-0 fw-normal text-center lh-base'>Are you sure you want to permanently delete the <span
                className='text-primary fw-bold'>{itemToUpdate.name}</span> product?</h5>

            <div className='w-100 d-flex gap-3'>
                <Button className='w-100' variant='outline-primary' onClick={closeModal}>
                    Cancel</Button>

                <Button className='w-100' onClick={confirmDeleteProduct}>
                    Yes Delete</Button>
            </div>
        </Modal>
    );
}