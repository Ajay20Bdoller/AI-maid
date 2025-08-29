import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    selectedComponentId: varchar({ length: 255 })   // 👈 yeh naya column
});


export const HistoryTable = pgTable('historyTable',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId:varchar().notNull(),
    content:json(),
    userEmail:varchar('userEmail').references(()=>usersTable.email),
    createdAt:varchar()
})