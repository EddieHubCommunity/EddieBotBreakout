import { CommandInteraction } from "discord.js";

import { DiscordBot } from "./DiscordBot";

/**
 * Handles the logic execution for a command interaction.
 *
 * @param {DiscordBot} bot The bot instance.
 * @param {CommandInteraction} interaction The command interaction.
 */
export type CommandHandler = (
  bot: DiscordBot,
  interaction: CommandInteraction
) => Promise<void>;
