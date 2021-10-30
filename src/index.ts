import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
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
    onReady(bot);
  });

  bot.on("interactionCreate", async (interaction) => {
    await onInteraction(bot, interaction);
  });

  await bot.login(process.env.TOKEN);
})();
