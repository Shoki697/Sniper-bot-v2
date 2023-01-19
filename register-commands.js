require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'snipe',
        description: 'Sniper bot.',
        options: 
        [
          {
            name: 'server',
            description: 'Melyik szerver?',
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: 'ki',
            description: 'Kicsoda?',
            type: ApplicationCommandOptionType.String,
            required: false,
          },
          {
            name: 'guild',
            description: 'Melyik guild?',
            type: ApplicationCommandOptionType.String,
            required: false,
          },
          {
            name: 'info',
            description: 'Valami info',
            type: ApplicationCommandOptionType.String,
            required: false,
          },
        ],
    },
    {
    name: 'reset',
    description: 'Sniper bot reset',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
     console.log('Registering slash commands...');

     await rest.put(
        Routes.applicationGuildCommands(
            process.env.CLIENT_ID, 
            process.env.GUILD_ID
        ),
        { body: commands }
      );

     console.log('Slash commands were regisered succesfully!');
    } catch (error) {
     console.log(`There was an error: ${error}`);
    }
})();