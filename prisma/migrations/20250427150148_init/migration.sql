-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('draft', 'in_progress', 'completed', 'archived');

-- CreateEnum
CREATE TYPE "EngineerSpeciality" AS ENUM ('mechanical', 'electrical', 'aerodynamics', 'software');

-- CreateEnum
CREATE TYPE "PrototypeStatus" AS ENUM ('designing', 'building', 'testing', 'approved');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engineer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" "EngineerSpeciality" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineerOnProject" (
    "engineerId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngineerOnProject_pkey" PRIMARY KEY ("engineerId","projectId")
);

-- CreateTable
CREATE TABLE "CarPrototype" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "status" "PrototypeStatus" NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "CarPrototype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "prototypeId" INTEGER NOT NULL,
    "testType" TEXT NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EngineerOnProject" ADD CONSTRAINT "EngineerOnProject_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "Engineer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerOnProject" ADD CONSTRAINT "EngineerOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarPrototype" ADD CONSTRAINT "CarPrototype_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_prototypeId_fkey" FOREIGN KEY ("prototypeId") REFERENCES "CarPrototype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
