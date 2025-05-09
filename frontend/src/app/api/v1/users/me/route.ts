import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type GetResponseBody = {
  user: {
    id: string;
    email: string;
  };
};

const BASE_URL = process.env.NEXT_BACKEND_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const currentToken = cookieStore.get('token');

    if (currentToken === undefined) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BASE_URL}/v1/users/me`, {
      headers: {
        Authorization: currentToken.value,
      },
    });
    const json = (await response.json()) as GetResponseBody;

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to get user' }, { status: response.status });
    }

    const token = response.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ message: 'Failed to get user' }, { status: 400 });
    }

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json(json.user, { status: 200 });
  } catch (error) {
    console.error('Fetch request failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
