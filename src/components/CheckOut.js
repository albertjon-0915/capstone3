import Swal from 'sweetalert2';
import {Button} from 'react-bootstrap';
import {useEffect} from 'react';

export default function Checkout({totalPrice, clearCart, fetchData}){
	   	console.log(totalPrice)

function checkout(){
	let token = localStorage.getItem('token');

	fetch(`${process.env.REACT_APP_API_BASE_URL}/order/checkout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.then(data => {

		if(data.message === 'Successfully checkout order'){
	        clearCart();
	        Swal.fire({
	            icon: 'success',
	            title: 'Thanks for shopping on us!',
	            text: data.message
	        })

		} else {
	        Swal.fire({
	            icon: 'error',
	            title: 'Something went wrong',
	            text: data.message
	        })			
		}
	})
}

useEffect(() => {
	fetchData();
}, [])

	return (
		<Button variant="primary" onClick={checkout}>Check Out ${totalPrice}</Button>
	)
}