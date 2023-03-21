import axiosClient from "./baseApi";

interface SendMessagePayload {
  profession: string;
  skills: string;
  jobs: string;
  bio: string;
}
export const sendMessage = async (payload: SendMessagePayload) => {
  return axiosClient.post("/openai/send-message", payload);
};
