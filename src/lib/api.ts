import axios from "axios";
import { supabase } from "@/src/lib/supabase";

import Constants from "expo-constants";

export const baseURL = Constants.expoConfig?.hostUri
  ? "http://" +
    Constants.expoConfig?.hostUri.split(`:`)?.shift()?.concat(`:8080/`)
  : "";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (request) => {
  console.log(`requesting to ${request.url}`)
  const sessionResponse = await supabase.auth.getSession();
  const { session } = sessionResponse.data;
  console.log(`in api, get session ${JSON.stringify(session?.access_token)}`);
  if (session && !request.headers.Authorization) {
    request.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return request;
});

api.interceptors.response.use((response) => response.data);

export { api };
