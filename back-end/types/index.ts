type UserInput = {
  id?: number;
  password: string;
  firstName: string;
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

export {
  UserInput,
  ChatInput
}



