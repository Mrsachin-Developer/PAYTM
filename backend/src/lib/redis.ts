import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

export const redis = createClient({
  url: redisUrl,
});
redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

await redis.connect();
