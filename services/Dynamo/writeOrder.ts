import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const writeOrderGenerator = (ddbDocClient: DynamoDBDocumentClient) => {
  const writeOrder = async (Item: any, TableName: string) => {
    const removeUnsafeInts = (Item: any) => {
      for (const key in Item) {
        if (Item[key] !== null && typeof Item[key] === "object") {
          removeUnsafeInts(Item[key]);
        } else if (
          Item[key] !== null &&
          typeof Item[key] === "number" &&
          Item[key] >= Number.MAX_SAFE_INTEGER
        ) {
          Item[key] = Item[key].toString();
        }
      }
    };

    removeUnsafeInts(Item);

    const params = {
      TableName,
      Item,
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      const size = new TextEncoder().encode(JSON.stringify(Item)).length;
      const kiloBytes = size / 1024;
      const wait = Math.ceil(kiloBytes / 4) * 1000 * 3;
      console.log(`Order was ${kiloBytes}kb will wait for ${wait}ms`);
      // await new Promise((resolve) => setTimeout(resolve, wait));
      console.log("Success - item added or updated", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  return writeOrder;
};
