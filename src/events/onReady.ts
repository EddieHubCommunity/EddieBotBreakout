import { DiscordBot } from "../interfaces/DiscordBot";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";

/**
 * Handles receiving the "ready" event from Discord.
 *
 * @param {DiscordBot} bot The bot's Discord instance.
 */
export const onReady = (bot: DiscordBot) => {
  try {
    logHandler.log("debug", "Bot is connected to Discord and ready!");
  } catch (err) {
    void errorHandler(
      bot,
      "on ready event",
      "This really should not error...",
      err
    );
  }
};
