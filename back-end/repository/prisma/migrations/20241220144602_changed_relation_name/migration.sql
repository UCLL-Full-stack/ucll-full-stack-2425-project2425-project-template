-- DropForeignKey
ALTER TABLE "_RaceCrash" DROP CONSTRAINT "_RaceCrash_B_fkey";

-- CreateTable
CREATE TABLE "_TempRaceCrash" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TempRaceCrash_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TempRaceCrash_B_index" ON "_TempRaceCrash"("B");

-- AddForeignKey
ALTER TABLE "_RaceCrash" ADD CONSTRAINT "_RaceCrash_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TempRaceCrash" ADD CONSTRAINT "_TempRaceCrash_A_fkey" FOREIGN KEY ("A") REFERENCES "Crash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TempRaceCrash" ADD CONSTRAINT "_TempRaceCrash_B_fkey" FOREIGN KEY ("B") REFERENCES "TempRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
