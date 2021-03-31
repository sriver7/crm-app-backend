import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const payments_create = handler(async(event, context) => {

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableNamePayments,
        Item: {
            paymentId: uuid.v1(),
            customerId: data.customerId,
            payment_amount: Number(data.payment_amount),
            payment_check_num: data.payment_check_num,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});

export const payments_get = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNamePayments,
        Key: {
            paymentId: event.pathParameters.id,
        },
    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }
    return result.Item;
});

export const payments_update = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableNamePayments,
        Key: {
            paymentId: event.pathParameters.id,
        },
        UpdateExpression: "SET customerId = :customerId, payment_amount = :payment_amount, payment_check_num = :payment_check_num",
        ExpressionAttributeValues: {
            ":customerId": data.customerId || null,
            ":payment_amount": Number(data.payment_amount) || null,
            ":payment_check_num": data.payment_check_num || null,
        },
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return {
        status: true
    };
});

export const payment_get_by_customer = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNamePayments,
        FilterExpression: event.pathParameters.customerId,
        ProjectionExpression: "paymentId, payment_amount",
    };
    const result = await dynamoDb.scan(params);
    return result;
});

export const payments_delete = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNamePayments,
    Key: {
      paymentId: event.pathParameters.id,
    },
  };
  await dynamoDb.delete(params);
  return {
    status: true
  };
});