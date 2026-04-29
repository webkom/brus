import { BRUS_COST } from "@/app/utils/constants";
import { BuyRefillBrusRequest } from "@/app/utils/interfaces";
import { NextResponse } from "next/server";
import getUserCollection from "../getUserCollection";

export const POST = async (req: Request) => {
  try {
    const userCollection = await getUserCollection();
    const { brusAmount, userBrusName, brusType } =
      (await req.json()) as BuyRefillBrusRequest;

    await userCollection.updateOne(
      { brusName: userBrusName },
      {
        $inc: { saldo: brusAmount * BRUS_COST[brusType] },
        $push: {
          history: {
            $each: [{ type: "refill", brusType, qty: brusAmount, amount: brusAmount * BRUS_COST[brusType], ts: Date.now() }],
            $position: 0,
            $slice: 30,
          },
        },
      },
    );

    const updatedUser = await userCollection.findOne({
      brusName: userBrusName,
    });
    if (!updatedUser) {
      return NextResponse.json({ error: "No user found" }, { status: 500 });
    }
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
