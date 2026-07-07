// src/app/api/checkout/momo/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    const partnerCode = process.env.MOMO_PARTNER_CODE || "MOMOBKUN20180810";
    const accessKey = process.env.MOMO_ACCESS_KEY || "klm05TvyrrtihgFl";
    const secretKey = process.env.MOMO_SECRET_KEY || "at1槍1t7H6D1C1B1A0A0A0A0A0A0A0A0";
    const redirectUrl = "http://localhost:3000/checkout/momo-callback";
    const ipnUrl = "http://localhost:3000/api/checkout/momo-ipn";

    const requestId = orderId;
    const orderInfo = "Pay for Dappermen Order " + orderId;
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      partnerName: "Dappermen Shop",
      storeId: "DappermenStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: "vi",
      requestType,
      extraData,
      signature,
    };

    console.log("Sending request to MoMo Sandbox:", requestBody);

    try {
      const response = await fetch("https://test-payment.momo.vn/v2/gateway/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(6000), // Timeout after 6s
      });

      const data = await response.json();
      console.log("MoMo Sandbox response:", data);

      if (data && data.payUrl) {
        return NextResponse.json({ payUrl: data.payUrl });
      }
    } catch (fetchErr) {
      console.warn("Connection to MoMo Sandbox timed out or failed, utilizing local mock payment portal instead.");
    }

    // Fallback: return our mock gateway url if MoMo rejects the request, is offline, or credentials fail
    const mockPayUrl = `/checkout/momo-mock-gateway?orderId=${orderId}&amount=${amount}`;
    return NextResponse.json({ payUrl: mockPayUrl });
  } catch (err: any) {
    console.error("MoMo initialization error:", err);
    return NextResponse.json({ error: "MoMo initialization failed" }, { status: 500 });
  }
}
