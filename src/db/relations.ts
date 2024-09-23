import { relations } from "drizzle-orm/relations";
import { users, cards, deskCards, desks, favoriteCards } from "./schema";

export const cardsRelations = relations(cards, ({ one, many }) => ({
  user: one(users, {
    fields: [cards.userId],
    references: [users.id],
  }),
  deskCards: many(deskCards),
  favoriteCards: many(favoriteCards),
}));

export const usersRelations = relations(users, ({ many }) => ({
  cards: many(cards),
  desks: many(desks),
  favoriteCards: many(favoriteCards),
}));

export const deskCardsRelations = relations(deskCards, ({ one }) => ({
  card: one(cards, {
    fields: [deskCards.cardId],
    references: [cards.id],
  }),
  desk: one(desks, {
    fields: [deskCards.deskId],
    references: [desks.id],
  }),
}));

export const desksRelations = relations(desks, ({ one, many }) => ({
  deskCards: many(deskCards),
  user: one(users, {
    fields: [desks.userId],
    references: [users.id],
  }),
}));

export const favoriteCardsRelations = relations(favoriteCards, ({ one }) => ({
  card: one(cards, {
    fields: [favoriteCards.cardId],
    references: [cards.id],
  }),
  user: one(users, {
    fields: [favoriteCards.userId],
    references: [users.id],
  }),
}));
