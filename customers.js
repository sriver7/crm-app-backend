import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


export const customer_create = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      customerId: uuid.v1(),
      customer_name: data.customer_name,
      customer_phone_1: data.customer_phone_1,
      customer_phone_2: data.customer_phone_2,
      customer_address_1: data.customer_address_1,
      customer_address_2: data.customer_address_2,
      customer_city: data.customer_city,
      customer_state: data.customer_state,
      customer_email: data.customer_email,
      customer_note: data.customer_note,
      customer_is_active: data.customer_is_active,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});


export const customer_get = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      customerId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});


export const customers_get_all = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
  };
  // Can aadd projection expression above
  // ProjectionExpression: "id, customer_name, customer_phone_1"
  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return result;
});


export const customer_update = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      customerId: event.pathParameters.id, // The id of the customer from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET customer_name  = :customer_name, customer_phone_1 = :customer_phone_1, customer_phone_2 = :customer_phone_2, customer_address_1 = :customer_address_1, customer_address_2 = :customer_address_2, customer_city = :customer_city, customer_state = :customer_state, customer_email = :customer_email, customer_note = :customer_note, customer_is_active = :customer_is_active",
    ExpressionAttributeValues: {
      ":customer_name": data.customer_name || null,
      ":customer_phone_1": data.customer_phone_1 || null,
      ":customer_phone_2": data.customer_phone_2 || null,
      ":customer_address_1": data.customer_address_1 || null,
      ":customer_address_2": data.customer_address_2 || null,
      ":customer_city": data.customer_city || null,
      ":customer_state": data.customer_state || null,
      ":customer_email": data.customer_email || null,
      ":customer_note": data.customer_note || null,
      ":customer_is_active": data.customer_is_active || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update;
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return {
    status: true
  };
});


export const customer_delete = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      customerId: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params);

  return {
    status: true
  };
});