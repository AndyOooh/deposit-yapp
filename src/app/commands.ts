export type Command = {
  command: string;
  description: string;
  examples?: string[];
};

export const getCommands = (userEns: string): Command[] => [
  {
    command: "/subscribe",
    description:
      "Subscribe to payment notifications.\n Optional filters:\n - [to:receiver] \n - [from:sender] \n - [status:(success|semifinal|final)]",
    examples: [`/subscribe ${userEns}`, `/subscribe to:${userEns}`, `/subscribe to:${userEns} from:bob.eth status:success`],
  },
  {
    command: "/unsubscribe",
    description: "Unsubscribe from notifications.\n Same filters as subscribe (except status).\n Use 'all' to remove all subscriptions.",
    examples: [`/unsubscribe ${userEns}`, `/unsubscribe to:${userEns} from:bob.eth`, "/unsubscribe all"],
  },
  {
    command: "/list",
    description: "View all your active subscriptions",
  },
  {
    command: "/about",
    description: "Show available commands and usage information",
  },
];
