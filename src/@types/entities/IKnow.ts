export interface IKnowNowIPConversation {
  conversation_id: string;
  user_id: string;
  role: "ai" | "human";
  service_name: string;
  title: string;
  content: string;
}

export interface IKnowNowIPMessage {
  message_id: number;
  role: "ai" | "human";
  content: string;
  liked: boolean;
  created_at: string;
}

export interface IKnowNowIPConversations {
  conversations: IKnowNowIPChat[];
}

export interface IKnowNowIPChat {
  conversation: IKnowNowIPConversation[];
  conversation_id: string;
  title: string;
}

export interface IKnowIP {
  user_id: string;
  service_name: string;
}

export interface IKnowIPGetChat {
  user_id: string;
  conversation_id: string;
}

export interface IChats {
  chat_id: string;
  title: string;
}
