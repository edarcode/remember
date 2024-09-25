import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  numeric,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export enum Role {
  chief = "CHIEF",
  client = "CLIENT",
  admin = "ADMIN",
}

export const users = sqliteTable("users", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.chief, Role.admin, Role.client] }).default(
    Role.client
  ),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  img: text("img"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const favoriteCard = sqliteTable(
  "favoriteCard",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
  },
  (favoriteCard) => {
    return {
      id: primaryKey({
        columns: [favoriteCard.userId, favoriteCard.cardId],
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

export const deckCard = sqliteTable(
  "deckCard",
  {
    deskId: text("desk_id")
      .notNull()
      .references(() => decks.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
  },
  (deckCard) => {
    return {
      id: primaryKey({
        columns: [deckCard.deskId, deckCard.cardId],
      }),
    };
  }
);

export const decks = sqliteTable("decks", {
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
