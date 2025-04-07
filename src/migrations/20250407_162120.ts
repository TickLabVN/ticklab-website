import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "bio" TO "about";
  ALTER TABLE "users" RENAME COLUMN "infomation_github" TO "information_github";
  ALTER TABLE "users" RENAME COLUMN "infomation_linkedin" TO "information_linkedin";
  ALTER TABLE "users" RENAME COLUMN "infomation_phone" TO "information_phone";
  ALTER TABLE "users" RENAME COLUMN "infomation_email" TO "information_email";
  ALTER TABLE "users" RENAME COLUMN "infomation_major" TO "information_major";
  ALTER TABLE "users" RENAME COLUMN "infomation_position" TO "information_position";
  ALTER TABLE "users" RENAME COLUMN "infomation_university" TO "information_university";
  ALTER TABLE "users" RENAME COLUMN "infomation_cv_id" TO "information_cv_id";
  ALTER TABLE "users" DROP CONSTRAINT "users_infomation_cv_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_infomation_infomation_cv_idx";
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_information_cv_id_media_id_fk" FOREIGN KEY ("information_cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_information_information_cv_idx" ON "users" USING btree ("information_cv_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" RENAME COLUMN "about" TO "bio";
  ALTER TABLE "users" RENAME COLUMN "information_github" TO "infomation_github";
  ALTER TABLE "users" RENAME COLUMN "information_linkedin" TO "infomation_linkedin";
  ALTER TABLE "users" RENAME COLUMN "information_phone" TO "infomation_phone";
  ALTER TABLE "users" RENAME COLUMN "information_email" TO "infomation_email";
  ALTER TABLE "users" RENAME COLUMN "information_major" TO "infomation_major";
  ALTER TABLE "users" RENAME COLUMN "information_position" TO "infomation_position";
  ALTER TABLE "users" RENAME COLUMN "information_university" TO "infomation_university";
  ALTER TABLE "users" RENAME COLUMN "information_cv_id" TO "infomation_cv_id";
  ALTER TABLE "users" DROP CONSTRAINT "users_information_cv_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_information_information_cv_idx";
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_infomation_cv_id_media_id_fk" FOREIGN KEY ("infomation_cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_infomation_infomation_cv_idx" ON "users" USING btree ("infomation_cv_id");`)
}
