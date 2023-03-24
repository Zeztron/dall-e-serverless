import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import AWS from 'aws-sdk';
import axios from 'axios';
import openai from '../lib/openai';

const s3 = new AWS.S3();

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { prompt } = JSON.parse(event.body!);
  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing prompt' }),
    };
  }

  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = response.data.data[0].url!;

  // Download the image and return it as an array buffer
  const res = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const arrayBuffer = res.data;

  const timestamp = new Date().getTime();
  const fileName = `${JSON.stringify(prompt)}_${timestamp}.png`;
  await s3
    .upload({
      Bucket: process.env.S3_BUCKET!,
      Key: fileName,
      Body: arrayBuffer,
    })
    .promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: 'Successfully uploaded image.',
  };
};
