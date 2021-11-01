import { MessageEmbed } from "discord.js";

import { DiscordBot } from "../interfaces/DiscordBot";

import { logHandler } from "./logHandler";

/**
 * Module to receive an error object, parse the information into a readable
 * format, and post the information to a webhook.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 * @param {string} title A descriptive title explaining the error.
 * @param {string} notes Additional information related to the error.
 * @param {Error} err The Node.js error object.
 */
export const errorHandler = async (
  bot: DiscordBot,
  title: string,
  notes: string,
  err: unknown
): Promise<void> => {
  const error = err as Error;
  logHandler.log("error", `There was an error in the ${title}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: error.message, errorStack: error.stack })
  );

  const errorEmbed = new MessageEmbed();
  errorEmbed.setTitle(`${title} Error!`);
  errorEmbed.setDescription(error.message);
  errorEmbed.addField(
    "Stack Trace:",
    `\`\`\`\n${error.stack || "unknown"}\n\`\`\``
  );
  errorEmbed.addField("Notes:", notes);

  await bot.debugHook.send({ embeds: [errorEmbed] });
};
