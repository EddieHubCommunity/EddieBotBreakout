import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";

import { DiscordBot } from "../interfaces/DiscordBot";

/**
 * Reads the commands attached to the bot instance,
 * and PUTs the command data to Discord as guild commands
 * for non-production and global commands for production.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 */
export const registerCommands = async (bot: DiscordBot): Promise<void> => {
  console.debug("Registering command data...");
  const rest = new REST({ version: "9" }).setToken(bot.config.token);

  const commandData: {
    name: string;
    description?: string;
    type?: number;
    options?: APIApplicationCommandOption[];
  }[] = [];

  bot.commands.forEach((command) => {
    commandData.push(command.data.toJSON());
  });

  if (process.env.NODE_ENV === "production") {
    console.debug("Production mode detected, registering globally");
    await rest.put(Routes.applicationCommands(bot.config.id), {
      body: commandData,
    });
  } else {
    console.debug(`Registering to ${bot.config.homeGuild}`);
    await rest.put(
      Routes.applicationGuildCommands(bot.config.id, bot.config.homeGuild),
      { body: commandData }
    );
  }
};
