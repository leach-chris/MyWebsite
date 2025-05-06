

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { latitude, longitude } = JSON.parse(event.body);

    if (!latitude || !longitude) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Latitude and longitude are required.' }),
      };
    }

    // Mock reverse geocoding to get the city name
    const city = await getCityFromCoordinates(latitude, longitude);

    if (!city) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'City not found.' }),
      };
    }

    // Update DynamoDB
    const params = {
      TableName: process.env.STORAGE_CITYCHECKINS_NAME, // DynamoDB table name
      Key: { city },
      UpdateExpression: 'SET checkins = if_not_exists(checkins, :start) + :inc',
      ExpressionAttributeValues: {
        ':start': 0,
        ':inc': 1,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ city, checkins: result.Attributes.checkins }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error.' }),
    };
  }
};

// Mock reverse geocoding function
async function getCityFromCoordinates(latitude, longitude) {
  // Replace this with a real reverse geocoding API call
  return 'MockCity';
}
