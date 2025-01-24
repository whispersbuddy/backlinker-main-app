/*
  Warnings:

  - A unique constraint covering the columns "stripe_customer_id" on the table "users" will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns "stripe_subscription_id" on the table "users" will be added. If there are existing duplicate values, this will fail.
*/

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT IF EXISTS "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "users"
    ADD COLUMN "stripe_current_period_end" TIMESTAMPTZ(3),
    ADD COLUMN "stripe_customer_id" VARCHAR(191),
    ADD COLUMN "stripe_price_id" VARCHAR(191),
    ADD COLUMN "stripe_subscription_id" VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");
