/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const fetch = require('node-fetch'); // You'll need to add this dependency

const tableName = process.env.STORAGE_CITYCHECKINS_NAME || 'CityCheckins-dev';

exports.handler = async (event) => {
  try {
    const { latitude, longitude } = JSON.parse(event.body);

    if (!latitude || !longitude) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Latitude and longitude are required.' }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
    }

    // Get the city name using reverse geocoding
    const city = await getCityFromCoordinates(latitude, longitude);

    if (!city) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'City not found.' }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
    }

    // Update DynamoDB
    const params = {
      TableName: tableName, // Use the variable instead of process.env directly
      Key: { city },
      UpdateExpression: 'SET checkins = if_not_exists(checkins, :start) + :inc',
      ExpressionAttributeValues: {
        ':start': 0,
        ':inc': 1,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const result = await dynamoDb.update(params).promise();
    
    // Get all cities data
    const scanParams = {
      TableName: tableName // Use the variable here too
    };
    
    const scanResult = await dynamoDb.scan(scanParams).promise();
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        city: city,
        checkins: result.Attributes.checkins,
        allCities: scanResult.Items
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({ error: 'Internal server error.' }),
    };
  }
};

// Actual reverse geocoding function using a free service
async function getCityFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    
    const data = await response.json();
    
    // Extract city from the response
    // OpenStreetMap typically provides city in address.city or address.town
    const address = data.address || {};
    const city = address.city || address.town || address.village || address.hamlet;
    
    return city || 'Unknown Location';
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
}
