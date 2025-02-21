import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function InProgressToastContent({icon, text})
{
    return (
        <div className='d-flex gap-2  align-items-center'>
            <FontAwesomeIcon icon={icon} spin size='lg'></FontAwesomeIcon>
            {text}
        </div>
    );
}