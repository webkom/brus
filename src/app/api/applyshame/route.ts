import { BRUS_COST } from "@/app/utils/constants";
import { getUserCollection } from "../mongodb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  function applyPunishment(amount: number, daysSincePunishment: number) {
    if (daysSincePunishment >= 7) {
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
              $set: { saldo: 0, dateSinceNegative: null },
            },
          },
        });
        continue;
      }

      let daysSincePunishment = 0;
      if (user.dateSinceNegative) {
        const lastPunishmentDate = new Date(user.dateSinceNegative);
        const diffTime = Math.abs(
          today.getTime() - lastPunishmentDate.getTime(),
        );
        daysSincePunishment += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        user.dateSinceNegative = today;
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
              ...(newSaldo >= 0 ? { dateSinceNegative: null } : {}),
            },
            ...(user.dateSinceNegative ? {} : { dateSinceNegative: today }),
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
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
