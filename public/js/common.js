
const form = document.querySelector("form");
const addressInput = document.querySelector("#address");

console.log(addressInput);
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

function formSubmitted(e) {
    console.log('common js loaded');
    e.preventDefault();

    msg1.innerHTML = '';
    msg2.innerHTML = '';
    const address = addressInput.value;
    if (address) {
        msg1.innerHTML = 'Loading...';
        fetch('http://localhost:3000/weather/api?address=' + address).then((response) => {
            if (response.status !== 200) {
                return console.log('Error in connecting weather api');
            }
            response.json().then((data) => {
                if (data.error) {
                    msg1.innerHTML = data.error;
                } else {
                    msg1.innerHTML = data.forecast
                    msg2.innerHTML = data.location;
                }
            });
        }).catch((err) => {
            msg1.innerHTML = err;
        });
    } else {
        msg1.innerHTML = 'Please enter address';
    }
}
