import { NextResponse } from "next/server";
import "server-only";
import { z } from "zod";
import { getClient } from "@/app/lib/clients";

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

  return NextResponse.json(getClient(id));
}
