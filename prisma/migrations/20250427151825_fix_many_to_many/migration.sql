/*
  Warnings:

  - You are about to drop the `CarPrototype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Engineer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EngineerOnProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarPrototype" DROP CONSTRAINT "CarPrototype_projectId_fkey";

-- DropForeignKey
ALTER TABLE "EngineerOnProject" DROP CONSTRAINT "EngineerOnProject_engineerId_fkey";

-- DropForeignKey
ALTER TABLE "EngineerOnProject" DROP CONSTRAINT "EngineerOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_prototypeId_fkey";

-- DropTable
DROP TABLE "CarPrototype";

-- DropTable
DROP TABLE "Engineer";

-- DropTable
DROP TABLE "EngineerOnProject";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "TestResult";

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engineers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" "EngineerSpeciality" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "engineers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_prototypes" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "status" "PrototypeStatus" NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "car_prototypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_results" (
    "id" SERIAL NOT NULL,
    "prototypeId" INTEGER NOT NULL,
    "testType" TEXT NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectEngineers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectEngineers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectEngineers_B_index" ON "_ProjectEngineers"("B");

-- AddForeignKey
ALTER TABLE "car_prototypes" ADD CONSTRAINT "car_prototypes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_prototypeId_fkey" FOREIGN KEY ("prototypeId") REFERENCES "car_prototypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectEngineers" ADD CONSTRAINT "_ProjectEngineers_A_fkey" FOREIGN KEY ("A") REFERENCES "engineers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectEngineers" ADD CONSTRAINT "_ProjectEngineers_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
