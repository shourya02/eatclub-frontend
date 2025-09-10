import axios from 'axios';
import { Restaurant } from '@/models/restaurant';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get('https://eccdn.com.au/misc/challengedata.json');
    return NextResponse.json(response.data.restaurants as Restaurant[]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}