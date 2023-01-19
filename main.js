require('dotenv').config();

const moment = require('moment-timezone');
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;
const { Events, Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ]
})

let connection;

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});

client.once('ready', (c) => 
{
    console.log('I am ready!');
});

const channels = [
    'ser1',
    'ser2',
    'ser3',
    'ser4',
    'ser5',
    'ser6',
    'med1',
    'med2',
    'med3',
    'med4',
    'med5',
    'med6',
    'bal1',
    'bal2',
    'bal3',
    'bal4',
    'bal5',
    'bal6',
    'val1',
    'val2',
    'val3',
    'val4',
    'val5',
    'val6',
    'cal1',
    'cal2',
    'cal3',
    'cal4',
    'cal5',
    'cal6',
    'kam1',
    'kam2',
    'kam3',
    'kam4',
    'kam5',
    'kam6',
    'arsha',
];

client.on(Events.InteractionCreate, async interaction => 
{
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'snipe') 
    {
        clear(interaction.channel)
        if (channels.includes(interaction.options.get('server').value)) 
        {
            let setData = `SET Time = "${moment().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss')}", user =  "${interaction.user}"`;
            if (interaction.options.getString('ki')) {
                setData += `, name = "${interaction.options.get('ki').value}"`;
            }
            if (interaction.options.getString('guild')) {
                setData += `, guild = "${interaction.options.get('guild').value}"`;
            }
            if (interaction.options.getString('info')) {
                setData += `, info = "${interaction.options.get('info').value}"`;
            }
            connection.query(`UPDATE channelcheck ${setData} WHERE channel = "${interaction.options.get('server').value}"`, console.log);

            interaction.reply(`A [${interaction.options.get('server').value}] channel mentve!`);
        } 
        else 
        {
            interaction.reply(`Ne legyél hülye, [${interaction.options.get('server').value}] channelt nem ismerem!`);
        }
        channel = interaction.options.get('server').value;

        connection.query('SELECT * FROM channelcheck', async (error, rows) => {
                lines = '```css';
                rows.forEach(channelData => {
                    let status = '⚪';
                    if (channelData.user) {
                        status = '🔴';
                    }
                    if (channelData.guild || channelData.name) {
                        status = '🟢';
                    }

                    let line = `\n ${status} ${channelData.channel}`;

                    if (channelData.name) {
                        line += ` ${channelData.name}`;
                    }
                    if (channelData.guild) {
                        line += ` <${channelData.guild}>`;
                    }
                    if (channelData.Time) {
                       line += ` [${moment(channelData.Time).format('HH:mm')}]`;
                    }
                    if (channelData.info) {
                        line += ` ${channelData.info}`;
                    }
                    lines += line;
                });
                lines += '```';
                await interaction.channel
                .send(lines)
        });
    }
});

client.on(Events.InteractionCreate, async interaction => 
{
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'reset') 
        {
            connection.query(`DELETE FROM channelcheck`, console.log);

            channels.forEach(element => 
            {
                 connection.query(`INSERT INTO channelcheck (channel) VALUES ('${element}')`, console.log);
            });
            clear(interaction.channel)
            interaction.reply(`Magyarkereső drónok fellőve!`);
        }
});

function clear(channel) {
    try {
        channel.messages.fetch({limit: 10}).then(function (list) {
            channel.bulkDelete(list, true);
        });
    } catch (e) {
        console.log(e)
    }
}
client.login(process.env.TOKEN);
handleDbConnection();

function handleDbConnection() {
    connection = mysql.createConnection({
        host: 'eu-cdbr-west-03.cleardb.net',
        port: '3306',
        user: 'b2b3cdb8a5be6d',
        password: 'afa68842',
        database: 'heroku_7145b1b7608b192'
    });
    connection.connect(error => {
        if (error) {
            console.log('Something went wrong');
            setTimeout(handleDbConnection, 2000);
        } else {
            console.log('Connected to DB');
            connection.query('SHOW TABLES', console.log);
        }
    });

    connection.on('error', function (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDbConnection();
        } else {
            console.log('Something went wrong');
            console.log(error);
            throw error;
        }
    })
}
