/* eslint-disable jsdoc/require-jsdoc */
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { ChannelType } from "discord-api-types";

import { Command } from "../interfaces/Command";
import { handleBreakout } from "../modules/subcommands/handleBreakout";
import { errorHandler } from "../utils/errorHandler";

export const voice: Command = {
  data: new SlashCommandBuilder()
    .setName("speed-networking")
    .setDescription("Voice commands!")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("breakout")
        .setDescription("Start a breakout session!")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to pull members from.")
            .setRequired(true)
            .addChannelType(ChannelType.GuildVoice)
        )
        .addIntegerOption((option) =>
          option
            .setName("duration")
            .setDescription("Length of the breakout session, in minutes.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("size")
            .setDescription("Maximum size for a single breakout room.")
            .setRequired(true)
        )
    ),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply();

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case "breakout":
          await handleBreakout(bot, interaction);
          break;
        default:
          await interaction.editReply({
            content: "Oops nhcarrigan broke it again",
          });
      }
    } catch (err) {
      await errorHandler(
        bot,
        "Voice command",
        "Occurs at the top level command.",
        err
      );
    }
  },
};
