// document
//   .getElementById("payment-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const cardNumber = document.getElementById("card-number").value;
//     const expiryDate = document.getElementById("expiry-date").value;
//     const cvv = document.getElementById("cvv").value;

//     console.log("Cardholder Name:", name);
//     console.log("Card Number:", cardNumber);
//     console.log("Expiry Date:", expiryDate);
//     console.log("CVV:", cvv);

//     alert("Payment Submitted!");
//   });




document.addEventListener('DOMContentLoaded', async () => {
  const stripe = Stripe('pk_test_51PZc2gJPkxvlRS0UYLU7oi0cvb41pVzIcvg6LglZV1MWQPKPV9rXYeki4iQjOsEkOx4WvO7fBm7mRztucEr6yMcV003N6AGQsc'); // Replace with your Stripe public key
  const elements = stripe.elements();

  const form = document.getElementById('payment-form');
  const cardElement = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
      },
    },
  });

  cardElement.mount('#card-number');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;

    const response = await fetch('http://localhost:4000/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // Replace with the amount you want to charge (in cents)
      }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        },
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log('Payment successful!', paymentIntent);
      alert('Payment Submitted!');
    }
  });
});

