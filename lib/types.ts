export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'in-progress' | 'resolved';
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
