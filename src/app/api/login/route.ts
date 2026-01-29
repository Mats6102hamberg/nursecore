import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set({
    name: "session",
    value: "authenticated",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
