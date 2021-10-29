import { readdir } from "fs/promises";
import { join } from "path";

import { Command } from "../interfaces/Command";
import { DiscordBot } from "../interfaces/DiscordBot";

/**
 * Reads the commands from the commands directory and
 * parses them into data for the bot.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 */
export const loadCommands = async (bot: DiscordBot): Promise<void> => {
  console.debug("Loading command data...");
  const result: Command[] = [];
  const files = await readdir(join(process.cwd() + "/prod/commands"), "utf-8");
  for (const file of files) {
    const name = file.split(".")[0];
    const mod = await import(join(process.cwd() + `/prod/commands/${file}`));
    result.push(mod[name] as Command);
  }
  bot.commands = result;
  console.debug("Command data loaded.");
};
