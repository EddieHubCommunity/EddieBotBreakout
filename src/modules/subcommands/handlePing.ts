/* eslint-disable jsdoc/require-param */
import { MessageEmbed } from "discord.js";

import { CommandHandler } from "../../interfaces/CommandHandler";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Handles the response time for the bot.
 */
export const handlePing: CommandHandler = async (bot, interaction) => {
  try {
    const { createdTimestamp } = interaction;

    const delay = Date.now() - createdTimestamp;
    const isSlow = delay > 100;

    const pingEmbed = new MessageEmbed();
    pingEmbed.setTitle("Pong!");
    pingEmbed.setColor(isSlow ? "RED" : "GREEN");
    pingEmbed.setDescription(`Response time: ${delay}ms`);

    await interaction.editReply({ embeds: [pingEmbed] });
  } catch (err) {
    await errorHandler(
      bot,
      "ping handler",
      "Occurs within the logic for the ping subcommand.",
      err
    );
  }
};
