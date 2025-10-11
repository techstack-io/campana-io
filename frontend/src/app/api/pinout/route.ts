import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("http://127.0.0.1:8000/pinout/start", {
    method: "POST",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
