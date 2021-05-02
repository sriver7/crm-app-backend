import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const locations_create = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableNameLocations,
        Item: {
            locationId: uuid.v1(),
            customerId: data.customerId,
            loc_address_1: data.loc_address_1,
            loc_address_2: data.loc_address_2,
            loc_city: data.loc_city,
            loc_state: data.loc_state,
            loc_zip: data.loc_zip,
            loc_grass: data.loc_grass,
            loc_mulch: data.loc_mulch,
            loc_fallCleanup: data.loc_fallCleanup,
            loc_fertilizer: data.loc_fertilizer,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);
    return params.Item;
});

export const location_update = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameLocations,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      locationId: event.pathParameters.id, // The id of the location from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET customerId = :customerId, loc_address_1 = :loc_address_1, loc_address_2 = :loc_address_2, loc_city = :loc_city, loc_state = :loc_state, loc_zip = :loc_zip, loc_grass = :loc_grass, loc_mulch = :loc_mulch, loc_fallCleanup = :loc_fallCleanup, loc_fertilizer = :loc_fertilizer",
    ExpressionAttributeValues: {
        ":customerId": data.customerId || null,
        "loc_address_1": data.loc_address_1 || null,
        "loc_address_2": data.loc_address_2loc_address_2 || null,
        "loc_city": data.loc_city || null,
        "loc_state": data.loc_state|| null,
        "loc_zip": data.loc_zip || null,
        "loc_grass": data.loc_grass || null,
        "loc_mulch": data.loc_mulch || null,
        "loc_fallCleanup": data.loc_fallCleanup || null,
        "loc_fertilizer": data.loc_fertilizer || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return {
      status: true,
      body: "HELP ME"
      };
});
export const location_get = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameLocations,
        Key: {
            locationId: event.pathParameters.id,
        },

    };
    const result = await dynamoDb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }
    return result.Item;
});

export const locations_get_all = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameLocations,
    };
    const result = await dynamoDb.scan(params);
    return result;
});

export const locations_get_by_customer = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameLocations,
        FilterExpression: "customerId = :customerId",
        ExpressionAttributeValues: {
            ":customerId": event.pathParameters.id,
        },
        //AttributeNamesMap: {
        //    "#name0": "customerId"
        //},
        //ConditionalExpression: "customerId= "+event.pathParameters.id,
        ProjectionExpression: "locationId, loc_address_1, loc_city, loc_grass, loc_mulch, loc_fertilizer, loc_fallCleanup"
    };
    const result = await dynamoDb.scan(params);
    return result;
});

export const location_delete = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableNameLocations,
        Key: {
            locationId: event.pathParameters.id,
        },
    };

    await dynamoDb.delete(params);

    return {
        status: true
    };
});