import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const quotes_create = handler(async(event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableNameQuotes,
        Item: {
            quotesId: uuid.v1(),
            customerId: data.customerId,
            quote_status: data.quote_status,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});

export const quotes_get_all = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameQuotes,
  };
  // Can aadd projection expression above
  // ProjectionExpression: "id, customer_name"
  const result = await dynamoDb.scan(params);
  return result;
});

export const quotes_get = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameQuotes,
        Key: {
            quotesId: event.pathParameters.id,
        },
    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }
    return result.Item;
});

export const quotes_update = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableNameQuotes,
        Key: {
            quotesId: event.pathParameters.id,
        },
        UpdateExpression: "SET customerId = :customerId, quote_status = :quote_status",
        ExpressionAttributeValues: {
            ":customerId": data.customerId || null,
            ":quote_status": data.quote_status || null,
        },
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return {
        status: true
    };
});

export const quotes_delete = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameQuotes,
    Key: {
      quotesId: event.pathParameters.id,
    },
  };
  await dynamoDb.delete(params);
  return {
    status: true
  };
});