import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function docusign_create(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableNameDocuSign,
        Item: {
            docusignId: uuid.v1(),
            docusign_key: data.docusign_key,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
}