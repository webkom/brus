import { NextResponse } from "next/server";
import { BRUS_COST } from "@/app/utils/constants";
import { BuyRefillBrusRequest } from "@/app/utils/interfaces";
import getUserCollection from "../getUserCollection";

export async function POST(req: Request) {
  try {
    const userCollection = await getUserCollection();
    const { brusAmount, userBrusName, brusType } =
      (await req.json()) as BuyRefillBrusRequest;

    await userCollection.updateOne(
      { brusName: userBrusName },
      {
        $inc: { saldo: -brusAmount * BRUS_COST[brusType] },
        $push: {
          history: {
            $each: [
              {
                type: "buy",
                brusType,
                qty: brusAmount,
                amount: brusAmount * BRUS_COST[brusType],
                ts: Date.now(),
              },
            ],
            $position: 0,
            $slice: 30,
          },
        },
      },
    );

    const updatedUser = await userCollection.findOne({ brusName: userBrusName });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Buying brus unsuccessful" },
      { status: 500 },
    );
  }
}
