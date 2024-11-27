type Type = 'basic' | 'advanced' | 'max';

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

type subscriptionInput = { 
  id?: number;
  type: Type;
  startDate: Date;
  endDate: Date;
}

export {
  Type,
  UserInput,
  ChatInput,
  GroupChatInput,
  subscriptionInput
}



