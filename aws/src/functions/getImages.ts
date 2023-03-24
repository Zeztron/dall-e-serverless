import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

function getImageKey(key: string) {
  return key;
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const images = await s3
    .listObjectsV2({
      Bucket: process.env.S3_BUCKET!,
    })
    .promise();

  const imageUrls = images.Contents!.map((image) => {
    return {
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${getImageKey(
        image.Key!
      )}`,
      name: image.Key!,
    };
  });

  const sortedUrl = imageUrls.sort((a, b) => {
    const aName = a.name.split('_').pop()!.toString().split('.').shift();
    const bName = b.name.split('_').pop()!.toString().split('.').shift();

    return parseInt(bName!) - parseInt(aName!);
  });


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    body: JSON.stringify(sortedUrl),
  };
};
