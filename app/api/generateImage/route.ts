import apiEndpoint from '@/config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = await request.json();
  const { prompt } = response;

  const res = await fetch(`${apiEndpoint}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const textData = await res.text();

  return NextResponse.json(textData);
}
