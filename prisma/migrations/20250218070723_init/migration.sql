-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255),
    "created_by" BIGINT,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verifications" (
    "id" BIGSERIAL NOT NULL,
    "entry" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "entity_id" BIGINT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "verified_at" TIMESTAMP(3),
    "created_by" BIGINT,

    CONSTRAINT "Verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdPartyClients" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "description" TEXT,
    "created_by" BIGINT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ThirdPartyClients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdPartyClientsApiKeys" (
    "id" BIGSERIAL NOT NULL,
    "client_id" BIGINT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_by" BIGINT,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "ThirdPartyClientsApiKeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdPartyClientsApiKeysLogs" (
    "id" BIGSERIAL NOT NULL,
    "key_id" BIGINT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" BIGINT,

    CONSTRAINT "ThirdPartyClientsApiKeysLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Verifications" ADD CONSTRAINT "Verifications_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdPartyClientsApiKeys" ADD CONSTRAINT "ThirdPartyClientsApiKeys_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "ThirdPartyClients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdPartyClientsApiKeysLogs" ADD CONSTRAINT "ThirdPartyClientsApiKeysLogs_key_id_fkey" FOREIGN KEY ("key_id") REFERENCES "ThirdPartyClientsApiKeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
