export interface INote extends Document {
    _id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
