import { createSession, createUser, findUserByEmail, serializeUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
  }

  const user = await createUser(email, password, name);
  await createSession(user.id);

  return NextResponse.json({ user: serializeUser(user) }, { status: 201 });
}
