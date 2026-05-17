import { NextResponse } from "next/server";
import { mockSlots } from "../doctors/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");
  
  // Simulate slight variation in availability per doctor/date
  const slots = mockSlots.map((slot) => ({
    ...slot,
    isBooked: Math.random() > 0.7, // 30% booked randomly
  }));

  return NextResponse.json({ doctorId, date, slots });
}
