// 'use client'; // for Next.js 13+ app directory

// import React from 'react';

// const RazorpayCheckout = () => {
//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     const handlePayment = async () => {
//         const res = await fetch('http://localhost:8080/create-order', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 amount: 50000, // amount in paise => ₹500
//             }),
//         });

//         const data = await res.json();

//         const razorpayLoaded = await loadRazorpayScript();
//         if (!razorpayLoaded) {
//             alert('Razorpay SDK failed to load');
//             return;
//         }

//         const options = {
//             key: 'YOUR_RAZORPAY_KEY_ID', // from Razorpay Dashboard
//             amount: data.amount,
//             currency: data.currency,
//             name: 'Your Company',
//             description: 'Test Payment',
//             order_id: data.id,
//             handler: async function (response) {
//                 // Send to backend for verification
//                 const verifyRes = await fetch('http://localhost:8080/verify-payment', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                     }),
//                 });

//                 const verifyData = await verifyRes.json();

//                 if (verifyData.success) {
//                     alert('✅ Payment successful and verified');
//                 } else {
//                     alert('❌ Payment verification failed');
//                 }
//             },
//             theme: {
//                 color: '#3399cc',
//             },
//         };

//         const rzp = new (window as any).Razorpay(options);
//         rzp.open();
//     };

//     return (
//         <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded">
//             Pay ₹500
//         </button>
//     );
// };

// export default RazorpayCheckout;
