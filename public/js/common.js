
const form = document.querySelector("form");
const addressInput = document.querySelector("#address");

console.log(addressInput);
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

function formSubmitted(e) {
    console.log('common js loaded');
    e.preventDefault();

    msg1.textContent = '';
    msg2.textContent = '';
    const address = addressInput.value;
    if (address) {
        msg1.textContent = 'Loading...';
        fetch('/weather/api?address=' + address).then((response) => {
            if (response.status !== 200) {
                return console.log('Error in connecting weather api');
            }
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error;
                } else {
                    msg1.textContent = data.forecast
                    msg2.textContent = data.location;
                }
            });
        }).catch((err) => {
            msg1.textContent = err;
        });
    } else {
        msg1.textContent = 'Please enter address';
    }
}
