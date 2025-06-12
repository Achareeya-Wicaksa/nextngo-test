export type Item = {
  id: string;
  name: string;
  price: number;
};

export const AUTH_TOKEN = "secrettoken123";

const rawUrl = process.env.NEXT_PUBLIC_API_URL;
if (!rawUrl) {
  throw new Error("API URL is not defined. Please set NEXT_PUBLIC_API_URL in your .env.local");
}
export const API_URL: string = rawUrl;
