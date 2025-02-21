import Card from "react-bootstrap/Card";
import formatCurrency from "../utilities/formatCurrency.js";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function ProductItem({item, onUpdateClickHandler, onDeleteClickHandler})
{
    return (
        <Card className='h-100 shadow-sm' border='light'>
            <div className='position-relative'>
                <Card.Img src={item.imgUrl || './imgs/placeholder-image.png'}
                          height={200}
                          style={{objectFit: 'cover'}}
                          variant='top'></Card.Img>
            </div>
            <Card.Body className='d-flex flex-column'>
                <Card.Title style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '2rem'
                }}>
                    <span className='fs-3'>{item.name}</span>
                    <span className='text-muted'>{formatCurrency(item.price)}</span>
                </Card.Title>
                <div className='me-auto w-100 d-flex gap-2'>
                    <Button className='w-100 fw-medium d-flex align-items-center justify-content-center gap-4'
                            style={{height: '2.5rem'}}
                            onClick={() => onUpdateClickHandler(item)}>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                        Update
                    </Button>
                    <Button className='border-0 fw-medium d-flex align-items-center justify-content-center gap-4'
                            variant='outline-primary'
                            style={{height: '2.5rem'}}
                            onClick={() => onDeleteClickHandler(item)}
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}
