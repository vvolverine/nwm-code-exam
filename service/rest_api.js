const fetch = require('node-fetch');
const chai = require('chai');

const { expect } = chai;

const findFirstUserAndValidate = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json()
        console.log(user)
        return expect(user.name).to.equal('Leanne Graham')
    };

module.exports = { findFirstUserAndValidate }