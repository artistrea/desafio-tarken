import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import Constants from "expo-constants";
const { expoConfig } = Constants;

const baseURL = expoConfig?.hostUri?.split(":")[0]
  ? `http://${expoConfig.hostUri.split(":")[0]}:3000`
  : `TODO: url de produção`;

export const api = axios.create({
  baseURL,
});

export const queryClient = new QueryClient();
