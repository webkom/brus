import { MinimalUser } from "@/app/utils/interfaces";
import { getUserCollection } from "../mongodb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  function applyPunishment(amount: number, days: number) {
    const M = 200;
    const T = 75;
    const c = 0.08;
    const maxDays = 42;

    const sigmoid = M / (1 + Math.exp(-c * (amount - T)));

    const timeFactor = Math.min(days / maxDays, 1);

    return sigmoid * timeFactor;
  }
  try {
    const userCollection = await getUserCollection();
    const today = new Date();

    const users = await userCollection.find().toArray();
    const bulkOperations = [];

    for (let user of users) {
      if (user.saldo >= 0) {
        continue;
      }

      let daysSincePunishment = 7;
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
            $set: { saldo: newSaldo },
            ...(user.dateSinceNegative ? {} : { dateSinceNegative: today }),
          },
        },
      });
    }

    if (bulkOperations.length > 0) {
      await userCollection.bulkWrite(bulkOperations);
    }

    const updatedUsers = (await userCollection.find().toArray())
      .filter((u) => u.saldo < 0)
      .map((uu) => {
        return { brusName: uu.brusName, saldo: uu.saldo };
      });
    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
