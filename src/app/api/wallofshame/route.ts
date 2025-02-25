import { getUserCollection } from "../mongodb";
import { NextResponse } from "next/server";

function applyPunishment(amount: number, days: number) {
  const M = 200;
  const T = 75;
  const c = 0.08;
  const maxDays = 42;

  const sigmoid = M / (1 + Math.exp(-c * (amount - T)));

  const timeFactor = Math.min(days / maxDays, 1);

  return sigmoid * timeFactor;
}

export const GET = async (req: Request) => {
  try {
    const userCollection = await getUserCollection();
    const today = new Date();

    for (let user of await userCollection.find().toArray()) {
      if (user.saldo >= 0) {
        continue;
      }

      let daysSincePunishment = 7;
      if (user.dateSinceNegative) {
        const lastPunishmentDate = new Date(user.dateSinceNegative);
        const diffTime = Math.abs(
          today.getTime() - lastPunishmentDate.getTime()
        );
        daysSincePunishment += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        user.dateSinceNegative = today;
      }

      const punishment = applyPunishment(user.saldo, daysSincePunishment);
      const newSaldo = user.saldo - punishment;

      await userCollection.updateOne(
        { brusName: user.brusName },
        {
          $set: { saldo: newSaldo, dateSincePunished: today },
        }
      );
    }

    const updatedUsers = await userCollection.find().toArray();
    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
