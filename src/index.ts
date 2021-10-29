import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { DiscordBot } from "./interfaces/DiscordBot";
import { loadCommands } from "./utils/loadCommands";
import { registerCommands } from "./utils/registerCommands";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as DiscordBot;
  validateEnv(bot);
  await loadCommands(bot);
  await registerCommands(bot);

  bot.on("ready", () => {
    console.debug(`Logged in as ${bot.user?.tag}!`);
  });

  bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    for (const command of bot.commands) {
      if (command.data.name === interaction.commandName) {
        await command.run(bot, interaction);
        break;
      }
    }
  });

  await bot.login(process.env.TOKEN);
})();
