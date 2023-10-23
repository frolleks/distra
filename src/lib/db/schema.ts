import { relations } from "drizzle-orm";
import { pgTable, bigint, varchar, text } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const user = pgTable("auth_user", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  username: varchar("username", { length: 32 }).unique().notNull(),
  displayName: varchar("display_name", { length: 32 }).notNull(),
  profilePicture: text("profile_picture"),
});

export const userRelations = relations(user, ({ many }) => ({
  videos: many(video),
}));

export const session = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => user.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const video = pgTable("videos", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => ulid()),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 5000 }),
  videoKey: varchar("video_key").notNull(),
  thumbnailKey: varchar("thumbnail_key"),
  authorId: varchar("author_id"),
});

export const videoRelations = relations(video, ({ one }) => ({
  author: one(user, {
    fields: [video.authorId],
    references: [user.id],
  }),
}));
