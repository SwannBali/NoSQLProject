import { Document, Schema, connection } from '@ioc:Adonis/Addons/Mongoose'

export interface TestInterface extends Document {
  fieldname: string
  dateCreated: Date
  dateUpdated: Date
}

const schema = new Schema<TestInterface>(
  {
    fieldname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated',
    },
  }
)

export default connection.model<TestInterface>('Test', schema)
