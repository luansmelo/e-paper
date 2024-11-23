CREATE TYPE "public"."document_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "fileUrl" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "status" "document_status" DEFAULT 'pending' NOT NULL;