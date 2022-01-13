const { html } = require('cheerio/lib/api/manipulation');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    name: "watch",
    description: "Tests an embedded object sending into chat",
    execute(client, message, args, Discord) {


        let url = 'https://www.justwatch.com/us/';
        let searchCategory = ['movie/','tv-show/'];

        if ( args[0] === '-tv' || args[0] === '-show' ) { // indicates to search for a tv show only
            args.shift();
            [searchCategory[0], searchCategory[1]] = [searchCategory[1], searchCategory [0]];
        } else if ( args[0] === '-movie' || args[0] === '-movies' ) { args.shift(); } 

        function scrapeResponse(response, genre) {
            const html = response.data;
            const $ = cheerio.load(html);
            let queryReply = {};

            const searchTitle = $('.title-block').text().replace(/\s/,'');
            queryReply['searchTitle'] = searchTitle; 


            /* CREATES A LIST OF FREE STREAMING SERVICES (Subscription/Ads) */
            let listStream = [];
            
            let stream = $('.monetizations', html)
                .children().next().children().next().children();
    
            while(stream.find('img').attr('title')) {
                let tempService = { 'name':  stream.find('img').attr('title')};
                listStream.push({ 
                    'name': stream.find('img').attr('title'),
                    'link': stream.find('a').attr('href')
                });
                stream = stream.next();
            }

            const imdbRating = $('.jw-scoring-listing').children().next().find('a').text().split(' ')[1];
            queryReply['imdbRating'] = imdbRating;
            queryReply['genre'] = genre;
            queryReply['listStream'] = listStream;

            console.log(queryReply);

            message.reply(
            `**${queryReply.searchTitle}**
                > ${queryReply.genre}
                > IMDB: **${queryReply.imdbRating}**
                > Where to watch: ${queryReply.listStream}`);

            return queryReply;
        }
        
        axios( url + searchCategory[0] + args.join('-') )
            .then(response => {
                let queryReply = scrapeResponse(response, searchCategory[0].split('/')[0].split('-').join(' ')); 

            }).catch(
                err => { // check if its a tv show: 
                    axios( url + searchCategory[1] + args.join('-') )
                        .then(response => {
                            let queryReply =  scrapeResponse(response, 
                                searchCategory[1].split('/')[0].split('-').join(' '));
                        }).catch ( err => {
                            console.log(err);
                            message.reply(`There was an error in looking for "${args.join(' ')}."`)
                        })
                });

        // if (message.author.id === client.user.id) return;
        
        // fs.readFile("./src/commands/templates/lol.json", function (error, content) {
        //     var data = JSON.parse(content);
        //     return message.channel.send(data);
        // })
    }
}