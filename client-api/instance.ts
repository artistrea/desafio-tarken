import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create();

export const queryClient = new QueryClient();
