/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `todolist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `todolist_username_key` ON `todolist`(`username`);
