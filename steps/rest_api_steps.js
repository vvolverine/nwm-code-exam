const { Given, When, Then } = require('cucumber');
const rest_api = require('../service/rest_api.js')
const { findFirstUserAndValidate } = rest_api
const { createPhotoAndValidate } = rest_api
const { updateFirstUserAndValidate } = rest_api
const { deleteThirdAlbumAndValidate } = rest_api

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