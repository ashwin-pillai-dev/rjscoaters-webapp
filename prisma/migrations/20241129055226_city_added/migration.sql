-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "contactNumber" TEXT NOT NULL,
    "clientTypeId" TEXT NOT NULL,
    "cityId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Client_clientTypeId_fkey" FOREIGN KEY ("clientTypeId") REFERENCES "ClientType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Client_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address", "clientTypeId", "contactNumber", "createdAt", "email", "id", "name", "updatedAt") SELECT "address", "clientTypeId", "contactNumber", "createdAt", "email", "id", "name", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE UNIQUE INDEX "Client_contactNumber_key" ON "Client"("contactNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
