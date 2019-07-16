export interface NewMessagePayload {
  matcheId: string;
  dateString: string; // limitation of Redis payload serialization
  text: string;
  userId: string;
}
