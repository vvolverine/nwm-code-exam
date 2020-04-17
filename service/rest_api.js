const fetch = require('node-fetch');
const chai = require('chai');

const { expect } = chai;

const findFirstUserAndValidate = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json()
        console.log(user)
        expect(user.name).to.equal('Leanne Graham')
    };

const createPhotoAndValidate = async () => {
        const new_photo = {
                            albumId: 99999,
                            title: "accusamus beatae ad facilis cum similique qui sunt",
                            url: "https://via.placeholder.com/600/92c952",
                            thumbnailUrl: "https://via.placeholder.com/150/92c952"
                          }
        const request_options = {
                            method: 'post',
                            body: JSON.stringify(new_photo),
                            headers: {'Content-Type': 'application/json'}
                           }
        const response = await fetch('https://jsonplaceholder.typicode.com/photos', request_options);
        const created_photo = await response.json()
        expect(created_photo.id).to.equal(5001)
        expect(created_photo.title).to.equal(new_photo.title)
        expect(created_photo.albumId).to.equal(new_photo.albumId)
        expect(created_photo.thumbnailUrl).to.equal(new_photo.thumbnailUrl)
        expect(created_photo.url).to.equal(new_photo.url)
}

const deleteThirdAlbumAndValidate = async () => {
        const request_options = {
                            method: 'delete',
                            headers: {'Content-Type': 'application/json'}
                           }
        const response = await fetch('https://jsonplaceholder.typicode.com/albums/3', request_options);
        expect(response.ok).to.be.true

}

const fetchFirstUser = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json()
        return user
}

const updateFirstUserAndValidate = async () => {
        const current_user = await fetchFirstUser()
        const updated_user = {...current_user, ...{name: 'updateName'}}
        const request_options = {
                            method: 'put',
                            body: JSON.stringify(updated_user),
                            headers: {'Content-Type': 'application/json'}
                           }
        const response = await fetch('https://jsonplaceholder.typicode.com/users/3', request_options);
        const user = await response.json()
        expect(user.name).to.equal('updateName')
        expect(user.username).to.equal('Bret')
        expect(user.id).to.equal(3)
}

module.exports = {  findFirstUserAndValidate,
                    createPhotoAndValidate,
                    updateFirstUserAndValidate,
                    deleteThirdAlbumAndValidate }