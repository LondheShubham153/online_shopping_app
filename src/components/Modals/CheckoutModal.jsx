/* eslint-disable react/no-unescaped-entities */
import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import {useRef, useState} from "react";
import {toast, Zoom} from 'react-toastify';
import {Flip} from 'react-toastify';
import emailjs from '@emailjs/browser';
import formatCurrency from "../../utilities/formatCurrency.js";
import {useShoppingItems} from "../../context/ShoppingItemsContext.jsx";
import {useShoppingCart} from "../../context/ShoppingCartContext.jsx";
import InProgressToastContent from "../InProgressToastContent.jsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";

emailjs.init({
    publicKey: 'EXYYOtTpg3-u4uLLl',
    // Do not allow headless browsers
    blockHeadless: true,
    limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 5s
        throttle: 5000,
    },
});

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

export default function CheckoutModal({modalIsOpen, closeModal})
{
    const [email, setEmail] = useState('')
    const {products} = useShoppingItems()
    const {cartItems, cartQuantity} = useShoppingCart();
    const reCaptcha = useRef(null)
    const total = formatCurrency(
        cartItems.reduce((total, currentItem) =>
        {
            const storeItem = products.find(i => i.id === currentItem.id) || 0;
            return total + storeItem.price * currentItem.quantity;
        }, 0)
    );

    const checkout = async (e) =>
    {
        e.preventDefault();

        const reCaptchaValue = reCaptcha.current.getValue();
        if (!reCaptchaValue)
        {
            toast.error('Please complete the reCAPTCHA to verify you\'re human', {autoClose: 2500})
            return;
        }

        const toastId = toast(
            <InProgressToastContent icon={faSpinner} text='Purchase in progress...'/>,
            {autoClose: false, closeButton: false})

        closeModal();

        const productsList = cartItems.map(item =>
        {
            const product = products.find(i => i.id === item.id);

            return {
                name: product.name,
                quantity: item.quantity,
                price: formatCurrency(item.quantity * product.price)
            }
        });

        const params = {
            // This is how you generate a unique id in js 🤦‍♂️.
            orderId: Date.now().toString(36) + Math.random().toString(36).substring(2),
            customerEmail: email,
            date: new Date().toLocaleString(),
            products: productsList,
            total: total,
            'g-recaptcha-response': reCaptchaValue,
        };

        emailjs.send('service_pqp2lrp', 'template_94fo759', params)
               .then(
                   () =>
                   {
                       toast.update(toastId,
                           {
                               type: 'success',
                               autoClose: 5000,
                               render: <span>Purchase complete!<br/><span
                                   className='text-muted small'>Check your email for your order details and receipt.</span></span>,
                               transition: Flip,
                               closeButton: true
                           })
                   },
                   (error) =>
                   {
                       toast.update(toastId,
                           {
                               type: 'error',
                               autoClose: false,
                               render: "Error purchasing: " + error.text,
                               transition: Zoom,
                               closeButton: true
                           })
                   },
               );
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Checkout Modal"
        >
            <form onSubmit={checkout} className='d-flex flex-column gap-4'>
                <h5 className='m-0 fw-normal text-center lh-base'>
                    You're about to purchase <span className='text-primary fw-bold'>{cartQuantity}</span> items
                    for a total of <span className='text-primary fw-bold'>{total}</span>. Are you sure you want to
                    proceed?
                </h5>

                <div className="form-group">
                    <label htmlFor="checkoutEmailInput">
                        Email <span className='text-muted small'>(to receive receipt)</span>
                    </label>
                    <input type="email"
                           className="form-control"
                           id="checkoutEmailInput"
                           placeholder="kinan@gmail.com"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <ReCAPTCHA
                    ref={reCaptcha}
                    sitekey="6LcyCioqAAAAANkAFzaMTH1Rk57Bi4qFJlsNKvxn"
                />

                <div className='w-100 d-flex gap-3'>
                    <Button className='w-100' variant='outline-primary' onClick={closeModal}>Cancel</Button>
                    <button type='submit' className='btn btn-primary w-100'>Purchase</button>
                </div>

                <div className='text-muted' style={{fontSize: '0.8rem'}}>
                    This site is protected by reCAPTCHA and the Google&nbsp;
                    <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>
            </form>
        </Modal>
    );
}