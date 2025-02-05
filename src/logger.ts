import pino from "pino";
import pretty from "pino-pretty";
import fs from "fs";

const env = process.env.NODE_ENV || "development";

export const logger = pino(
  {
    level: "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream([
    {
      stream: pretty({
        translateTime: "SYS:standard", // タイムスタンプを読みやすいフォーマットに
        ignore: "pid,hostname", // 不要なメタ情報を非表示に
        messageFormat: `[${env}] {msg}`, // 環境名も出力されるように
        sync: true, // 同期的な出力を有効化 (inquirerを使う場合、同期的にしないとメッセージの順番が異なってしまう)
      }),
    },
    {
      stream: fs.createWriteStream(`logs/${env}.log`, { flags: "a" }),
    },
  ])
);
