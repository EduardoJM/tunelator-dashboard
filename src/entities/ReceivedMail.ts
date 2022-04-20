export interface ReceivedMail {
  id: number;
  date: string;
  delivered: boolean;
  delivered_date: string;
  mail: number;
  origin_mail: string | null;
  subject: string | null;
}

export interface ReceivedMailPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReceivedMail[];
}
