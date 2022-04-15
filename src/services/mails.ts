import { UserMail, UserMailPaginatedResponse } from "../entities/UserMail";
import api from "./api";

export async function getLatestMails(): Promise<UserMail[]> {
  const response = await api.get<UserMailPaginatedResponse>(
    "/api/mails/?limit=5"
  );
  return response.data.results;
}

export async function setMailRedirectEnabled(
  id: number,
  enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/${id}/`, {
    redirect_enabled: enabled,
  });
  return response.data;
}
