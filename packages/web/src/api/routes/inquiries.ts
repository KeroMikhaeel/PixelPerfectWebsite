import { z } from "zod";
import { desc } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

export const inquiries = {
  create: base
    .input(
      z.object({
        name: z.string().min(1).max(200),
        email: z.string().email(),
        projectType: z.string().min(1).max(120),
        message: z.string().min(1).max(4000),
      }),
    )
    .handler(async ({ input }) => {
      const [inquiry] = await db.insert(schema.inquiries).values(input).returning();
      return inquiry;
    }),
  list: base.handler(() =>
    db.select().from(schema.inquiries).orderBy(desc(schema.inquiries.createdAt)),
  ),
};
