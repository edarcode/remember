import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  numeric,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export enum ROLE {
  chief = "CHIEF",
  client = "CLIENT",
  admin = "ADMIN",
}

export const users = sqliteTable("users", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [ROLE.chief, ROLE.admin, ROLE.client] }).default(
    ROLE.client
  ),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  img: text("img"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const favoriteCards = sqliteTable(
  "favoriteCards",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
  },
  (favoriteCards) => {
    return {
      id: primaryKey({
        columns: [favoriteCards.userId, favoriteCards.cardId],
      }),
    };
  }
);

export const cards = sqliteTable("cards", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  front: text("front").notNull(),
  back: text("back").notNull(),
  audio: text("audio").unique().notNull(),
  img: text("img").unique().notNull(),
  tag: text("tag").notNull(),
  likes: numeric("likes"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const deskCards = sqliteTable(
  "deskCards",
  {
    deskId: text("desk_id")
      .notNull()
      .references(() => desks.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
  },
  (deskCards) => {
    return {
      id: primaryKey({
        columns: [deskCards.deskId, deskCards.cardId],
      }),
    };
  }
);

export const desks = sqliteTable("desks", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof cards.$inferInsert;
export type SelectPost = typeof cards.$inferSelect;
