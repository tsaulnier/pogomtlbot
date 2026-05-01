const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const db = new sqlite3.Database('/data/stats.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            username TEXT,
            team TEXT,
            total_points INTEGER DEFAULT 0
        )
    `);
    // Add other tables here
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hello') {
    await interaction.reply(`Hello, ${interaction.user.username}!`);
  }
});

client.login(process.env.BOT_TOKEN);