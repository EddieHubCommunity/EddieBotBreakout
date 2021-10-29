import { DiscordBot } from "../interfaces/DiscordBot";

/**
 * Validates that all environment variables are
 * present, throws error if one is missing.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 */
export const validateEnv = (bot: DiscordBot) => {
  console.debug("Validating environment variables...");
  if (!process.env.TOKEN) {
    throw new Error("Missing discord bot token!");
  }
  if (!process.env.HOME_GUILD) {
    throw new Error("Missing home guild!");
  }
  if (!process.env.CLIENT_ID) {
    throw new Error("Missing bot id!");
  }

  bot.config = {
    token: process.env.TOKEN,
    homeGuild: process.env.HOME_GUILD,
    id: process.env.CLIENT_ID,
  };
  console.debug("Environment variables valid!");
};
