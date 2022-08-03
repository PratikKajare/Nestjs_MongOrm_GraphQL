import { Document } from 'mongoose';

export interface Cat extends Document {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}
