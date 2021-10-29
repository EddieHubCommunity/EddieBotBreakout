import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";

(async () => {
  const bot = new Client({ intents: IntentOptions });

  bot.on("ready", () => {
    console.log(`Logged in as ${bot.user?.tag}!`);
  });

  await bot.login(process.env.TOKEN);
})();
