import { NextResponse } from "next/server";
import pool from "../../../utils/db";



/*
Anubhav Tripathi 
09-09-2023
*/

export async function POST(request) {
  let payload = await request.json();
  console.log(payload.email);

  if (!payload.email || !payload.password) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [payload.email, payload.password];

    const { rows } = await pool.query(query, values);

    if (rows.length === 1) {
      return NextResponse.json({ result: "Successfully Login", success: true }, { status: 201 });
    } else {
      return NextResponse.json({ result: "User not found", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
