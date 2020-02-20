import { getTableName, client } from 'repositories/repositoryUtility';

const TableName = getTableName('Mexican');

export type Mexican = {
  id: string;
  name: string;
  bio: string;
};

const mexicanRepository = {
  get: async (mexicanId: string): Promise<Mexican> => {
    const result = await client
      .get({
        TableName,
        Key: {
          id: mexicanId,
        },
      })
      .promise();
    if (!result.Item) {
      throw new Error('Mexican not found');
    }
    return result.Item as Mexican;
  },
  delete: async (mexicanId: string): Promise<void> => {
    const mexican = await mexicanRepository.get(mexicanId);
    const transactionParams = {
      TransactItems: [
        {
          Delete: {
            TableName,
            Key: {
              id: mexicanId,
            },
          },
          ConditionExpression: 'attribute_exists(id)',
        },
        {
          Delete: {
            TableName,
            Key: {
              id: `${mexican.name}#name`,
            },
          },
          ConditionExpression: 'attribute_exists(id)',
        },
      ],
    };

    await client.transactWrite(transactionParams).promise();

    await client
      .delete({
        TableName,
        Key: {
          id: mexicanId,
        },
      })
      .promise();
  },
  create: async (mexican: Mexican): Promise<void> => {
    const transactionParams = {
      TransactItems: [
        {
          Put: {
            TableName,
            Item: mexican,
          },
          ConditionExpression: 'attribute_not_exists(id)',
        },
        {
          Put: {
            TableName,
            Item: {
              id: `${mexican.name}#name`,
              mexicanId: mexican.id,
            },
            ConditionExpression: 'attribute_not_exists(id)',
          },
        },
      ],
    };

    await client.transactWrite(transactionParams).promise();
  },
};
export default mexicanRepository;
