export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const cron = (await import("node-cron")).default;
    cron.schedule("20 16 * * 2", async () => {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
      try {
        await fetch(`${baseUrl}/api/applyshame`, { method: "POST" });
      } catch (err) {
        console.error("[shame cron] Failed to call applyshame:", err);
      }
    });
    console.log("[shame cron] Scheduled for Tuesdays at 16:20");
  }
}
