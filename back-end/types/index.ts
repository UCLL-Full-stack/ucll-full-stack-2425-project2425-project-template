type UserInput = {
  id?: number;
  password: string;
  firstname: string;
  name: string;
  role?: string;
  chats?: ChatInput[];
};

type ChatInput = {
  createdAt: Date;
  id?: number;
  message: string;
  userId: number;
}
type GroupChatInput = {
  createdAt: Date;
  id?: number;
  name: string;
  description: string;
}

export {
  UserInput,
  ChatInput,
  GroupChatInput
}



