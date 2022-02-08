# stubot

[Click here to add stubot to your discord server](https://discord.com/oauth2/authorize?client_id=928480283701944380&scope=bot&permissions=1099511627775). 

### Commands

`!help` – Displays all commands and descriptions.

`!v2g <video-attachment>` – Takes in a video attachment and outputs a gif attachment.

`!watch <movie, tv-show name>` – Takes in the name of a movie, tv-show from any country or any genre and returns its IMDB rating, links to where you can stream it with subscription or for free, and an image of the media poster.

`!ping` – To check the availability of the bot, you can use this command to checkout the server latency.

`!roll` – Allows you to roll a 6-sided die. Following the command directly it with an integer `!roll n` will roll an `n` sided die. 

### Free Guide and resources to making a discord bot:
Contains videos and online guides by others on some basics of discord bot building. Also includes potential ideas to add to this bot! 

- https://docs.google.com/document/d/1UT8n3j7T9lnCr312uU_KitiMS4UukuNjhBk7v8NvIfg/edit?usp=sharing

### Deploying the Bot/Contributing 
1. First fork the repository. 
2. In your terminal, run `git clone REPOLINK`
3. Create a .env file with `BOT_TOKEN` variable set to your bot token from your Discord Developer's Portal (see` .env.example` file for formating).
4. In the cloned repository, use `npm i` to install all dependencies.
5. In the terminal type `npm run dev` to open developer's mode. The bot should be live now (make sure to add your bot to a server to test your changes before making a pull request).
6. Make your changes and make a pull request with a detailed and concise commit message.


