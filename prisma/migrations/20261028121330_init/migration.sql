/*
  Warnings:

  - Added the required column `motivo` to the `citas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoUrgencia" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'CRITICA');

-- AlterTable
ALTER TABLE "citas" ADD COLUMN     "motivo" TEXT NOT NULL,
ADD COLUMN     "urgencia" "EstadoUrgencia" NOT NULL DEFAULT 'MEDIA';
