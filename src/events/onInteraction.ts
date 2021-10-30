import { Interaction } from "discord.js";

import { DiscordBot } from "../interfaces/DiscordBot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Logic to handle the interaction create event from Discord.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const onInteraction = async (
  bot: DiscordBot,
  interaction: Interaction
): Promise<void> => {
  try {
    if (!interaction.isCommand()) {
      return;
    }

    for (const command of bot.commands) {
      if (command.data.name === interaction.commandName) {
        await command.run(bot, interaction);
        break;
      }
    }
  } catch (err) {
    await errorHandler(
      bot,
      "interaction event",
      "This error threw in the logic for handling an interaction event.",
      err
    );
  }
};
