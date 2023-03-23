export interface Message {
  id: string;
  title: string;
  text: string;
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDto {
  title: string;
  text: string;
}

export interface MessagesFilters {
  search: string;
  date: string;
}
