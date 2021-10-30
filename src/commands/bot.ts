/* eslint-disable jsdoc/require-jsdoc */
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { handlePing } from "../modules/subcommands/handlePing";

export const bot: Command = {
  data: new SlashCommandBuilder()
    .setName("eddiebot-breakout-status")
    .setDescription("Commands related to the bot.")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("ping")
        .setDescription("Confirm the bot is alive!")
    ),
  run: async (bot, interaction) => {
    await interaction.deferReply();

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "ping":
        await handlePing(bot, interaction);
        break;
      default:
        await interaction.editReply({
          content: "Oops nhcarrigan broke it horribly.",
        });
    }
  },
};
