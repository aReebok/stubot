const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const { html } = require('cheerio/lib/api/manipulation');
const { MessageEmbed, TextChannel } = require('discord.js');
const imdbScraper = require('./imdbScraper');
// const { request } = require('http');
// const { title } = require('process');
// const { data } = require('cheerio/lib/api/attributes');


// async function getTitle(search) {
//     data = await imdbScraper.startSearch(search);
//     return data;
// }

module.exports = {
    name: "watch",
    description: "Tests an embedded object sending into chat",
    async execute(client, message, args, Discord) {


        let url = 'https://www.justwatch.com/us/';
        let searchCategory = ['movie/','tv-show/'];

        if ( args[0] === '-tv' || args[0] === '-show' ) { // indicates to search for a tv show only
            args.shift();
            [searchCategory[0], searchCategory[1]] = [searchCategory[1], searchCategory [0]];
        } else if ( args[0] === '-movie' || args[0] === '-movies' ) { args.shift(); } 

        function scrapeTitle(htmlBlock) {  return htmlBlock.text().replace(/\s/,'').split(')')[0] + ')'; }

        function scrapeStreams($) { 
            let listStream = [];
            let servicesPushed = [];

            $('.price-comparison__grid__row.price-comparison__grid__row--stream a').each(function () {
                let tempStreamObj = { 
                    'name': $(this).find('img').attr('title'),    // scrapes service name
                    'link': $(this).attr('href'),       // scrapes service url
                    'subtext': $(this).find('div').text()
                }
                if(servicesPushed.indexOf(tempStreamObj.name) === -1 && servicesPushed.length < 7) {
                    listStream.push(tempStreamObj); 
                    servicesPushed.push(tempStreamObj.name);
                }
            });

            return listStream;
        }

        function scrapeRating(htmlBlock) { return htmlBlock.children().next().find('a').text().split(' ')[1]; }
        function scrapePoster(htmlBlock) { return htmlBlock.find('picture').find('source').attr('data-srcset').split(',')[0]; }

        function createServiceFields(reply) {
            // takes a list of JSON objects and returns a list of fields containing json objects
            let services = reply.listStream;
            if (services.length === 0) {
                return [ { 
                    name: 'No free services found.', 
                    value: 'Try -bl command.', 
                    inline: true } ];
            }
            
            let returnFields = [];

            services.forEach(service => {
                returnFields.push(
                    {
                        name: `${service.name}`,
                        value: `[${service.subtext}](${service.link})`,
                        inline: true
                    }
                );
            });
              
            return returnFields;
        }

        function embedSend(replyObject) {

            if (message.author.id === client.user.id) return;

            const bannerEmbed = {
                author: {
                    name: `${client.user.tag}`,
                    icon_url: `${client.user.displayAvatarURL()}`
                },
                title: `${replyObject.searchTitle}`,
                description: `${replyObject.genre.toUpperCase()}   :arrow_right:   IMDB rating: **${replyObject.imdbRating}**`,
                color: '#d32256',
                image: {
                    url: `${replyObject.posterURL}`,
                },
            }

            let serviceEmbed = {
                description: `Where to watch **${replyObject.searchTitle}**?`,
                color: '#d32256',
                timestamp: new Date(),
                footer: {
                    text: 'Scraped from Just Watch',
                    icon_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/JustWatch.png',
                },
            }

            serviceEmbed = new MessageEmbed(serviceEmbed);
            serviceEmbed.addFields(createServiceFields(replyObject));

            message.channel.send({embeds: [bannerEmbed, serviceEmbed]});
        }

        function scrapeResponse(response, genre) {
            const html = response.data;
            const $ = cheerio.load(html);
            let queryReply = {};

            queryReply['searchTitle'] = scrapeTitle( $('.title-block') ); 
            queryReply['posterURL'] = scrapePoster( $('.jw-info-box__container-sidebar') );
            queryReply['genre'] = genre;
            queryReply['imdbRating'] = scrapeRating( $('.jw-scoring-listing') );
            queryReply['listStream'] = scrapeStreams( $ );


            // console.log(queryReply);
            return queryReply;
        }
        
        message.channel.sendTyping();

        let request = ["TITLE", "DATE", "SUMMARY", "NUM_OF_EPISODES"]

        let str = String(args.join(' '))
        // let title = await imdbScraper.searchIMDB(str , request);
        // let imdbtemp = await imdbScraper.getGoogleSearch(, 'imdb');
        let jwtemp = await imdbScraper.getGoogleSearch(args.join(' '), 'justwatch');
        
        // title = title.replace(/:/g, ' i')
        // .replace(/[^\w\s]|_/g, "")
        // .replace(/\s+/g, " ");//"lord of the rings: fellowship"

        // title = title.replace(/\s/g, '-');
        console.log(`title: ${jwtemp}`);

        // jw: ${jwtemp}
        return ""
        // return title;

        axios( url + searchCategory[0] + title )
            .then(response => {
                let queryReply = scrapeResponse(response, 
                    searchCategory[0].split('/')[0].split('-').join(' ')); 
                return embedSend(queryReply);
                
            }).catch(
                err => { // check if its a tv show: 
                    axios( url + searchCategory[1] + title )
                        .then(response => {
                            let queryReply = scrapeResponse(response, 
                                searchCategory[1].split('/')[0].split('-').join(' '));
                            return embedSend(queryReply);
                        }).catch ( err => {
                            console.log(err);
                            message.reply(`There was an error in looking for "${args.join(' ')}."`)
                        })
                });

    }
}