import {CircleLoader} from "react-spinners";

function LoadingSpinner()
{
    return (
        <div className='d-flex gap-5 text-muted flex-column justify-content-center align-items-center'
             style={{height: '100vh'}}>
            <CircleLoader color="#FF5733" size={100}/>
            <h4>Fetching products...</h4>
        </div>
    );
}

export default LoadingSpinner;