import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

type Orders =
  | "AmazonOrders"
  | "ShopeeOrders"
  | "LazadaOrders"
  | "WoocommerceOrders"
  | "ShopifyOrders";

const pagination = async (
  ddbDocClient: DynamoDBDocumentClient,
  params: any,
  LastEvaluatedKey: object | undefined
): Promise<any> => {
  const results = await ddbDocClient.send(
    new QueryCommand({
      ...params,
      LastEvaluatedKey,
      ExclusiveStartKey: LastEvaluatedKey,
    })
  );
  if (results.LastEvaluatedKey && results.Items) {
    const nextResults = await pagination(
      ddbDocClient,
      params,
      results.LastEvaluatedKey
    );
    return results.Items.concat(nextResults);
  }
  return results.Items;
};

export const getOrdersGenerator = (ddbDocClient: DynamoDBDocumentClient) => {
  const getOrders = async (
    shopId: string,
    updatedBefore: number,
    updatedAfter: number,
    TableName: Orders
  ) => {
    const params = {
      TableName,
      IndexName: "shopId-updatedAt-index",
      ExpressionAttributeValues: {
        ":shopId": shopId,
        ":updatedBefore": updatedBefore,
        ":updatedAfter": updatedAfter,
      },
      KeyConditionExpression: `shopId = :shopId AND updatedAt BETWEEN :updatedAfter AND :updatedBefore`,
    };
    const results = await pagination(ddbDocClient, params, undefined);
    return results;
  };
  return getOrders;
};
