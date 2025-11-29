import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  projectType: text("project_type").notNull(),
  description: text("description"),
  budget: text("budget"),
  timeline: text("timeline"),
  audience: text("audience"),
  goal: text("goal"),
  mood: text("mood"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  name: z.string().min(1, "الاسم مطلوب"),
  phone: z.string().min(1, "رقم الجوال مطلوب"),
  projectType: z.string().min(1, "نوع المشروع مطلوب"),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
