import { makeWebhookValidator } from "@whop/api";
import type { NextRequest } from "next/server";

const validateWebhook = makeWebhookValidator({
	webhookSecret: process.env.WHOP_WEBHOOK_SECRET ?? "fallback",
});

export async function POST(request: NextRequest): Promise<Response> {
	try {
		// Validate the webhook to ensure it's from Whop
		const webhookData = await validateWebhook(request);

		// Handle the webhook event
		if (webhookData.action === "payment.succeeded") {
			const { id, final_amount, amount_after_fees, currency, user_id } =
				webhookData.data;

			console.log(
				`Payment ${id} succeeded for ${user_id} with amount ${final_amount} ${currency}`,
			);

			// Handle payment success (you can add your logic here)
			// For now, we'll just log it
		}

		// Make sure to return a 2xx status code quickly
		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Webhook error:", error);
		return new Response("Error", { status: 500 });
	}
}