import { confirm } from "@inquirer/prompts";
import { logger } from "./logger";

for (let i = 0; i < 100; i++) {
  logger.info(`Count: ${i}`);
}

const main = async () => {
  const result = await confirm({ message: "続けますか？", default: false });
  logger.info(`結果: ${result}`);
};

main();
