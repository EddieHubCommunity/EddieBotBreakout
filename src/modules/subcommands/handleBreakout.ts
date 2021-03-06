/* eslint-disable jsdoc/require-param */
import { GuildMember, VoiceChannel } from "discord.js";

import { CommandHandler } from "../../interfaces/CommandHandler";
import { errorHandler } from "../../utils/errorHandler";
import { getRandomValue } from "../../utils/getRandomValue";

/**
 * Module to create breakout rooms, move members into those
 * rooms, then move back after session is over and clean up rooms.
 */
export const handleBreakout: CommandHandler = async (bot, interaction) => {
  try {
    const channel = interaction.options.getChannel("channel", true);
    const duration = interaction.options.getInteger("duration", true);
    const size = interaction.options.getInteger("size", true);
    const excludeUsers = ["840524820747911169"]; // exclude Sara

    if (channel.type !== "GUILD_VOICE") {
      await interaction.editReply(
        "This should not be possible but nhcarrigan is not perfect."
      );
      return;
    }

    if (!(interaction.member as GuildMember)?.permissions.has("MOVE_MEMBERS")) {
      await interaction.editReply(
        "You do not have permissions to run this slash command!"
      );
      return;
    }

    const members = Array.from(channel.members.values());
    const mutableMembers = members.filter(
      (member) => !excludeUsers.includes(member.user.id)
    );
    const totalMembers = mutableMembers.length;

    const category = channel.parent;

    const channelCount = Math.floor(totalMembers / size);
    const newChannels: VoiceChannel[] = [];

    for (let i = 1; i <= channelCount; i++) {
      const newChannel = await channel.guild.channels.create(`breakout-${i}`, {
        type: "GUILD_VOICE",
        parent: category || undefined,
        userLimit: size,
      });
      newChannels.push(newChannel);

      for (let j = 1; j <= size; j++) {
        const targetMember = getRandomValue(mutableMembers);
        const index = mutableMembers.findIndex((m) => m.id === targetMember.id);
        mutableMembers.splice(index, 1);
        try {
          await targetMember.voice.setChannel(newChannel);
        } catch (e) {
          await errorHandler(
            bot,
            "Moving Member",
            "This occurred when moving a member into a breakout room",
            e
          );
        }
      }

      mutableMembers.forEach(async (m) => {
        try {
          await m.voice.setChannel(newChannels[0]);
        } catch (e) {
          console.log(e);
        }
      });

      await interaction.editReply({
        content: `Started a breakout session with ${totalMembers} participants in ${newChannels.length} rooms for ${duration} minutes.`,
      });

      setTimeout(async () => {
        for (const member of members) {
          try {
            await member.voice.setChannel(channel as VoiceChannel);
          } catch (e) {
            await errorHandler(
              bot,
              "breakout handler",
              "Occurs within the logic to put a member back in the main voice.",
              e
            );
          }
        }
        for (const channel of newChannels) {
          await channel.delete();
        }
      }, duration * 60 * 1000);
    }
  } catch (err) {
    await errorHandler(
      bot,
      "breakout handler",
      "Occurs within the logic to create breakout sessions",
      err
    );
  }
};
