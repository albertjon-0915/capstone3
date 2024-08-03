import {Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';

export default function RemoveFromCart({id}){

function removeItem(){
    let token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${id}/remove-from-cart`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {

        if(data.message === 'Successfully remove cart items'){
            Swal.fire({
                icon: 'success',
                title: 'Successfully remove from cart',
                text: data.message
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: data.error
            })
        }
    })
}


    return (
        <Button className='mx-1' onClick={removeItem} >Remove</Button>

    )

}
