import { createClient } from "redis";

const client = createClient({});
const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Server connected to Redis.");
  } catch (error) {
    console.error(error);
  }
};

const getValueFromRedis = async (key: string) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (error) {
    console.error(error);
  }
};

const setValueFromRedis = async (key: string, value: string) => {
  try {
    await client.set(key, value);
  } catch (error) {
    console.error(error);
  }
};

export { connectRedis, getValueFromRedis, setValueFromRedis };
