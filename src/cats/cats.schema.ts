import mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  id: String!,
  name: String!,
  icon: String!,
  description: String!,
  status: String!,
  updatedAt: String!,
  createdAt: String!,
});
