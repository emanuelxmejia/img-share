// funcions that can use in all the app

const helpers = {};

// function to generate a random number by variable posible, between numbers and letters
helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNumber = 0;
    for(let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return randomNumber;
};

module.exports = helpers;