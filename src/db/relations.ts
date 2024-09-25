import { relations } from "drizzle-orm/relations";
import { users, cards, deckCard, decks, favoriteCard } from "./schema";

export const cardsRelations = relations(cards, ({ one, many }) => ({
  user: one(users, {
    fields: [cards.userId],
    references: [users.id],
  }),
  deckCards: many(deckCard),
  favoriteCards: many(favoriteCard),
}));

export const usersRelations = relations(users, ({ many }) => ({
  cards: many(cards),
  decks: many(decks),
  favoriteCards: many(favoriteCard),
}));

export const deckCardRelations = relations(deckCard, ({ one }) => ({
  card: one(cards, {
    fields: [deckCard.cardId],
    references: [cards.id],
  }),
  deck: one(decks, {
    fields: [deckCard.deskId],
    references: [decks.id],
  }),
}));

export const decksRelations = relations(decks, ({ one, many }) => ({
  deckCards: many(deckCard),
  user: one(users, {
    fields: [decks.userId],
    references: [users.id],
  }),
}));

export const favoriteCardRelations = relations(favoriteCard, ({ one }) => ({
  card: one(cards, {
    fields: [favoriteCard.cardId],
    references: [cards.id],
  }),
  user: one(users, {
    fields: [favoriteCard.userId],
    references: [users.id],
  }),
}));
