CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" TEXT UNIQUE NOT NULL,
	"name" VARCHAR(50) UNIQUE NOT NULL,
	"password" VARCHAR(60) NOT NULL,
	"picture" TEXT NOT NULL,
	"createdAt"  timestamp without time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp without time zone
);

CREATE TABLE "posts"(
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR(250),
	"url" TEXT NOT NULL,
	"userId" INTEGER REFERENCES "users"("id"),
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp without time zone
);

CREATE TABLE "hashtags"(
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR(50),
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp without time zone
);

CREATE TABLE "postsHashtags"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER REFERENCES "posts"("id"),
	"hashtagId" INTEGER REFERENCES "hashtags"("id")
);

CREATE TABLE "likes"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER REFERENCES "posts"("id"),
	"userId" INTEGER REFERENCES "users"("id")
);

CREATE TABLE "follow"(
	"id" SERIAL PRIMARY KEY,
	"followerId" INTEGER REFERENCES "users"("id"),
	"followedId" INTEGER REFERENCES "users"("id")
);

CREATE TABLE "comments"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER REFERENCES "posts"("id"),
	"userId" INTEGER REFERENCES "users"("id"),
	"text"  TEXT NOT NULL
);

CREATE TABLE "sharedPosts"(
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER REFERENCES "posts"("id"),
	"userId" INTEGER REFERENCES "users"("id"),
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE "postsHashtags"
	ADD CONSTRAINT "deletecascade" FOREIGN KEY ("hashtagId") REFERENCES hashtags("id") ON DELETE CASCADE;