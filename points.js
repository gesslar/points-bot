"use strict"

require ("dotenv/config") ;
const Discord = require("discord.js");
const fs = require("fs");

class Points {
    constructor () {
        this._pointsFile = `${process.env.POINTS_FILE}`;
    }

    onConnected (client) {
        console.log(`${client.user.username} has connected.`);
    }

    onMessage (message) {
        if(message.content.indexOf("++") > -1) {
            for(const mention of message.mentions.users) {
                if(mention[1].id === message.author.id) {
                    message.author.send("You may not give yourself points! Tsk!");
                    continue ;
                } else if(mention[1].id === message.client.user.id) {
                    message.author.send("Thanks, but I already have all the points!");
                    continue ;
                } else {
                    this.addPoints(message, mention[1], 1);
                }
            }
        }
    }

    readPoints () {
        const result = new Promise( (resolve, reject) => {
            fs.promises.access(this._pointsFile, fs.constants.R_OK | fs.constants.W_OK)
            .then(() => fs.promises.readFile(this._pointsFile)
                          .then( res => resolve(JSON.parse(res)) )
                          .catch( err => reject(err) )
            )
            .catch( err => reject(err) );
        });

        return result;
    }

    writePoints(json) {
        const result = new Promise( (resolve, reject) => {
            fs.promises.writeFile(this._pointsFile, JSON.stringify(json, null, 40))
            .then( resolve(json) )
            .catch( err => reject(err) );
        });

        return result;
    }

    addPoints( message, user, add ) {
        this.readPoints()
            .then( res => {
                if(!res.hasOwnProperty(user.id)) res[user.id] = add;
                else res[user.id] = res[user.id] + add;
                this.writePoints(res)
                    .then(message.channel.send(`${user.displayAvatarURL}${user} has been awarded a point! (Total: ${res[user.id]})`))
                    .catch( console.log );
            })
            .catch( console.log );
    }
};

module.exports = Points;
