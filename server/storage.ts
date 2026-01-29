import { type Booking, type InsertBooking, bookings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private bookings: Map<number, Booking>;
  private currentId: number;

  constructor() {
    this.bookings = new Map();
    this.currentId = 1;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { ...insertBooking, id, createdAt: new Date() };
    this.bookings.set(id, booking);
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
}

export class DatabaseStorage implements IStorage {
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db!.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db!.select().from(bookings);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db!.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
