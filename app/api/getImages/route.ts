import apiEndpoint from '@/config';

export async function GET(request: Request) {
  const response = await fetch(`${apiEndpoint}/images`, { cache: 'no-store' });

  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), { status: 200 });
}
