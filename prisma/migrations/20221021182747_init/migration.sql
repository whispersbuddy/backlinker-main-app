-- CreateTable
CREATE TABLE accounts (
    "id" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "type" VARCHAR(191) NOT NULL,
    "provider" VARCHAR(191) NOT NULL,
    "providerAccountId" VARCHAR(191) NOT NULL,
    "refresh_token" TEXT NULL,
    "access_token" TEXT NULL,
    "expires_at" INTEGER NULL,
    "token_type" VARCHAR(191) NULL,
    "scope" VARCHAR(191) NULL,
    "id_token" TEXT NULL,
    "session_state" VARCHAR(191) NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE ("provider", "providerAccountId"),
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE sessions (
    "id" VARCHAR(191) NOT NULL,
    "sessionToken" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMPTZ NOT NULL,
    UNIQUE ("sessionToken"),
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE users (
    "id" VARCHAR(191) NOT NULL,
    "name" VARCHAR(191) NULL,
    "email" VARCHAR(191) NULL,
    "emailVerified" TIMESTAMPTZ NULL,
    "image" VARCHAR(191) NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE ("email"),
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE verification_tokens (
    "identifier" VARCHAR(191) NOT NULL,
    token VARCHAR(191) NOT NULL,
    "expires" TIMESTAMPTZ NOT NULL,
    UNIQUE ("token"),
    UNIQUE ("identifier", "token")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
