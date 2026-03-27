type Message = {
   role: 'user' | 'model';
   parts: { text: string }[];
};

const conversations = new Map<string, Message[]>();

export const conversationRepository = {
   getHistory: (conversationId: string): Message[] => {
      return conversations.get(conversationId) || [];
   },
   addMessage: (conversationId: string, message: Message) => {
      const history = conversations.get(conversationId) || [];
      conversations.set(conversationId, [...history, message]);
   },
};
