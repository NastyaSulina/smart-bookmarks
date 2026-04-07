import { NextResponse } from "next/server";
import "server-only";
import { z } from "zod";
import { faker } from "@faker-js/faker";
import { Client } from "@/app/types/client";

const IdSchema = z
  .string()
  .regex(/^\d+$/, "id must contain only digits")
  .transform(Number)
  .refine((n) => n > 0 && n <= 1000, "Invalid id");

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const parsed = IdSchema.safeParse(id);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid id", details: parsed.error.message },
      { status: 400 },
    );
  }

  faker.seed(Number(id));
  const client: Client = { id, name: faker.person.fullName() };

  return NextResponse.json(client);
}
