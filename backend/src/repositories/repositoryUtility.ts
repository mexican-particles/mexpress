import AWS from 'aws-sdk';
import dotenv from 'dotenv';

if (!process.env.SERVICE) {
  // ローカル実行用
  dotenv.config();
  AWS.config.update({ region: process.env.REGION });
}

export const client = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line import/prefer-default-export
export function getTableName(tableName: string): string {
  return `${process.env.SERVICE}-${process.env.STAGE}-${tableName}`;
}
