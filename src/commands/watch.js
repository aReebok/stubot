const { html } = require('cheerio/lib/api/manipulation');

module.exports = {
    name: "watch",
    description: "Tests an embedded object sending into chat",
    execute(client, message, args, Discord) {
        const fs = require('fs');
        const cheerio = require('cheerio');
        const axios = require('axios');

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

            // $('.title-block', html).each(function () {
            //     const searchTitle = $(this).text();
            //     queryReply['searchTitle'] = searchTitle;
            // });

            const searchTitle = $('.title-block', html).text();
            queryReply['searchTitle'] = searchTitle;

            $('.price-comparison__grid__row__icon', html).each(function() {
                const serviceTitle = $(this).attr('title');
                console.log(serviceTitle)  
            })

            queryReply['genre'] = genre;

            console.log(queryReply);
            return queryReply;
        }

        axios( url + searchCategory[0] + args.join('-') )
            .then(response => {
                let queryReply = scrapeResponse(response, searchCategory[0].split('/')[0].split('-').join(' ').toUpperCase()); 

            }).catch(
                err => { // check if its a tv show: 
                    axios( url + searchCategory[1] + args.join('-') )
                        .then(response => {
                            let queryReply =  scrapeResponse(response, 
                                searchCategory[1].split('/')[0].split('-').join(' ').toUpperCase());
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