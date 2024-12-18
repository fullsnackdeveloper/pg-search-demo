import pool from "@/lib/pg/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextApiRequest) => {
  try {
    const {
      name,
      email,
      age,
      username,
      street,
      city,
      zip,
      phone,
      website,
      occupation,
      hobbies,
    } = await new Response(req.body).json();
    await pool.query(
      "INSERT INTO users (name, email, age, username, street, city, zip, phone, website, occupation, hobbies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        name,
        email,
        age,
        username,
        street,
        city,
        zip,
        phone,
        website,
        occupation,
        hobbies,
      ]
    );
    return NextResponse.json({ message: "User added" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (req: NextApiRequest) => {
  try {
    const { id } = await new Response(req.body).json();
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
