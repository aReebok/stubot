require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

module.exports = {
    name: 'v2g',
    description: "Sends a video to gyfcat api and recieves a gif of it",
    async execute(client, message, args, Discord) {
        let token_params = {
            client_id: process.env.GYFCAT_ID,
            client_secret: process.env.GYFCAT_SECRET,
            grant_type: 'client_credentials'
        };

        let createGIF = {
            fetchUrl: 'https://cdn.discordapp.com/attachments/730624878692008009/931087576838860870/20220112_203712.mp4',
            title: 'usergif'
        };

        let gifOBJ = {
            gfyname: 'SizzlingFickleKiskadee',
            secret: 'smjn9o9o6q',

            // gfyname2: 'UnrulyDimpledJavalina',
            // secret2: '66iscrmz1y6',

            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDIyMTcyMjcsImlzcyI6IjJfeHFWbDRBIiwicm9sZXMiOlsiQ29udGVudF9SZWFkZXIiXX0.cqWEbzMR7HWJ6fMeO6_tyLfVFTM36pFXMKbY5OmlwV4'
        }

        // get request to check if task upload was complete for the given gyfname. 
        const response = await axios.get(`https://api.gfycat.com/v1/gfycats/fetch/status/${gifOBJ.gfyname}`)
        console.log(response.data);

        // post request to create a gif, returns name of give, secret code...
        // const response = await axios.post('https://api.gfycat.com/v1/gfycats', createGIF);
        // console.log(response.data);

        // post request to get an access token
        // const response = await axios.post('https://api.gfycat.com/v1/oauth/token', token_params);
        // console.log(`ACCESS TOKEN: ${response.data.access_token}`);
    }

}

// async function getToken() {
//     // let token_params = {
//     //     client_id: process.env.GYFCAT_ID,
//     //     client_secret: process.env.GYFCAT_SECRET,
//     //     grant_type: 'client_credentials'
//     // };

//     // let ACCESS_TOKEN = '';

//     // await axios.post('https://api.gfycat.com/v1/oauth/token', token_params)
//     //     .then( response => { 
//     //         // console.log(response.data.access_token)
//     //         ACCESS_TOKEN = response.data.access_token;
//     //         });

//     // return ACCESS_TOKEN;
// }

// async function postVideo () {
//     const response = await 
// }

// exports.getToken = getToken;