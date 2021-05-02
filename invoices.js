import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const  invoice_create = handler(async(event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableNameInvoices,
        Item: {
            invoiceId: uuid.v1(),
            customerId: data.customerId,
            invoice_amount: Number(data.invoice_amount),
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});

export const invoice_get = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameInvoices,
        Key: {
            invoiceId: event.pathParameters.id,
        },
    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }
    return result.Item;
});

export const invoice_update = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableNameInvoices,
        Key: {
            invoiceId: event.pathParameters.id,
        },
        UpdateExpression: "SET customerId = :customerId, invoice_amount = :invoice_amount",
        ExpressionAttributeValues: {
            ":customerId": data.customerId || null,
            ":invoice_amount": Number(data.invoice_amount) || null,
        },
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return {
        status: true
    };
});

export const invoice_get_by_customer = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameInvoices,
        FilterExpression: "customerId = :customerId",
        ExpressionAttributeValues: {
            ":customerId": event.pathParameters.id,
        },
        ProjectionExpression: "invoiceId, invoice_amount"
    };
    const result = await dynamoDb.scan(params);
    return result;
});

export const invoice_delete = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameInvoices,
    Key: {
      invoiceId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return {
    status: true
  };
});