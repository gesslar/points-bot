"use strict"

require ("dotenv/config") ;
const Discord = require("discord.js");
const client  = new Discord.Client();
const Points  = require("./points");
const points  = new Points();

client.on("ready", () => points.onConnected(client) );
client.on("message", message => points.onMessage(message) );

client.login(process.env.DISCORD_TOKEN);
