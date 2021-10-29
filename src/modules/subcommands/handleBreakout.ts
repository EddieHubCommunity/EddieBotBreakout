/* eslint-disable jsdoc/require-param */
import { GuildChannel, VoiceChannel } from "discord.js";

import { CommandHandler } from "../../interfaces/CommandHandler";
import { getRandomValue } from "../../utils/getRandomValue";

/**
 * Module to create breakout rooms, move members into those
 * rooms, then move back after session is over and clean up rooms.
 */
export const handleBreakout: CommandHandler = async (bot, interaction) => {
  const channel = interaction.options.getChannel("channel", true);
  const duration = interaction.options.getInteger("duration", true);
  const size = interaction.options.getInteger("size", true);

  if (channel.type !== "GUILD_VOICE") {
    await interaction.editReply(
      "This should not be possible but nhcarrigan is not perfect."
    );
    return;
  }

  const members = Array.from(channel.members.values());
  const mutableMembers = members.slice();

  const category = channel.parent;

  const channelCount = Math.ceil(members.length / size);
  const newChannels: GuildChannel[] = [];

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
      await targetMember.voice.setChannel(newChannel);
    }
  }

  await interaction.editReply({
    content: `Started a breakout session with ${members.length} participants in ${newChannels.length} rooms for ${duration} minutes.`,
  });

  setTimeout(async () => {
    for (const member of members) {
      await member.voice.setChannel(channel as VoiceChannel);
    }
    for (const channel of newChannels) {
      await channel.delete();
    }
  }, duration * 60 * 1000);
};
