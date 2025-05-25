import { NextResponse } from "next/server";
import { BRUS_COST } from "@/app/utils/constants";
import { BuyRefillBrusRequest } from "@/app/utils/interfaces";
import getUserCollection from "../getUserCollection";

export async function POST(req: Request) {
  const userCollection = await getUserCollection();
  try {
    const { brusAmount, userBrusName, brusType } =
      (await req.json()) as BuyRefillBrusRequest;

    await userCollection.updateOne(
      { brusName: userBrusName },
      { $inc: { saldo: -brusAmount * BRUS_COST[brusType] } },
    );

    const updatedUser = await userCollection.findOne({ brusName: userBrusName });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Buying brus unsuccessful" },
      { status: 500 },
    );
  }
}
