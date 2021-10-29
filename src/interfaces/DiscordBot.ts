import { Client } from "discord.js";

import { Command } from "./Command";

export interface DiscordBot extends Client {
  config: {
    token: string;
    homeGuild: string;
    id: string;
  };
  commands: Command[];
}
