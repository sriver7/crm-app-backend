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

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e.message
            }),
        };
    }
}