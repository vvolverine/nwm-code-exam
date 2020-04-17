const { Given, When, Then } = require('cucumber');
const rest_steps = require('../service/rest_api.js')
const { findFirstUserAndValidate } = rest_steps
const { createPhotoAndValidate } = rest_steps
const { updateFirstUserAndValidate } = rest_steps
const { deleteThirdAlbumAndValidate } = rest_steps

const chai = require('chai');
const { expect } = chai;


Given('first user exist and valid', async () => {
    await findFirstUserAndValidate()
})

When('new valid user created', async () => {
    await createPhotoAndValidate()
})

When('first user can be updated correctly', async () => {
    await updateFirstUserAndValidate()
})

When('third album deleted successfully', async () => {
    await deleteThirdAlbumAndValidate()
})