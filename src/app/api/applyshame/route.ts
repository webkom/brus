import { BRUS_COST } from "@/app/utils/constants";
import { NextResponse } from "next/server";
import getUserCollection from "../getUserCollection";

export async function POST(req: Request) {
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000; // 604_500_000

  function applyPunishment(amount: number, elapsedMs: number) {
    if (elapsedMs >= SEVEN_DAYS_MS) {
      return Math.ceil(amount / 100) * BRUS_COST.Dahls;
    }
    return 0;
  }
  try {
    const userCollection = await getUserCollection();
    const today = new Date();

    const users = await userCollection.find().toArray();
    const bulkOperations = [];

    for (let user of users) {
      if (user.saldo >= 0) {
        bulkOperations.push({
          updateOne: {
            filter: { brusName: user.brusName },
            update: {
              $set: { dateSinceNegative: null },
            },
          },
        });
        continue;
      }

      const isFirstTime = !user.dateSinceNegative;
      if (isFirstTime) user.dateSinceNegative = today;

      let daysSincePunishment = 0;
      if (!isFirstTime && user.dateSinceNegative) {
        const lastPunishmentDate = new Date(user.dateSinceNegative);
        daysSincePunishment = today.getTime() - lastPunishmentDate.getTime();
      }

      const punishment = applyPunishment(
        Math.abs(user.saldo),
        daysSincePunishment,
      );
      const newSaldo = user.saldo - punishment;

      bulkOperations.push({
        updateOne: {
          filter: { brusName: user.brusName },
          update: {
            $set: {
              saldo: newSaldo >= 0 ? 0 : newSaldo,
              dateSinceNegative: isFirstTime
                ? today
                : newSaldo >= 0
                  ? null
                  : user.dateSinceNegative,
            },
          },
        },
      });
    }

    if (bulkOperations.length > 0) {
      await userCollection.bulkWrite(bulkOperations);
    }

    const updatedUsers = await userCollection.find().toArray();
    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
