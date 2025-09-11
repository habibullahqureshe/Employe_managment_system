import { getUserFromCookies } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User_model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decoded = await getUserFromCookies();
    if (!decoded) {
      return NextResponse.json(
        
        { message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    console.log("Decoded user:", decoded);

    await connectionToDatabase();

   
    await User.findByIdAndUpdate(decoded._id, { status: "offline" });

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
