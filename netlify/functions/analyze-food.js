/* =============================================================
   GYMORA — real AI food-photo analyzer (Netlify serverless function)
   -------------------------------------------------------------
   This is the "real AI" brain for the calorie tracker. It is DORMANT
   until you deploy it and point the app at it — the app works fully
   in demo mode without it. See AI-SETUP.md for the 3-step turn-on.

   It receives a food photo, asks Claude to identify the food and
   estimate its nutrients, and returns JSON the app understands:
     { items: [{ name, kcal, protein, carbs, fat }], confidence }

   The Anthropic API key lives ONLY here (a server), never in the app,
   so it is never exposed to visitors.
   ============================================================= */

const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

// Only these image types are accepted by the vision API.
const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Use POST" }) };
  }

  let image_base64, mime;
  try {
    ({ image_base64, mime } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }
  if (!image_base64) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing image_base64" }) };
  }
  const media_type = ALLOWED.includes(mime) ? mime : "image/jpeg";

  try {
    const response = await client.messages.create({
      // Haiku is fast and cheap for vision; override with AI_MODEL env if desired.
      model: process.env.AI_MODEL || "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type, data: image_base64 } },
            {
              type: "text",
              text:
                "Identify the food/drink in this photo and estimate its nutrition for the portion shown. " +
                "This includes packaged products and branded drinks (read the label if visible). " +
                "Respond with ONLY minified JSON, no prose and no code fences, in exactly this shape: " +
                '{"items":[{"name":"","kcal":0,"protein":0,"carbs":0,"fat":0}],"confidence":0} ' +
                "where name is short (e.g. \"Monster Energy (white)\"), macros are grams, and confidence is 0-100. " +
                "If you cannot tell it is food or drink, return {\"items\":[],\"confidence\":0}.",
            },
          ],
        },
      ],
    });

    // Be tolerant of any wrapping text/code-fences: pull out the JSON object.
    const raw = (response.content.find((b) => b.type === "text") || {}).text || "{}";
    const match = raw.match(/\{[\s\S]*\}/);
    const body = match ? match[0] : '{"items":[],"confidence":0}';
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body, // { items: [...], confidence } — matches the app's normalizeAI()
    };
  } catch (err) {
    // 401/permission → key missing or invalid; surface a clear hint in logs.
    const detail = String((err && err.message) || err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "AI analysis failed", detail }),
    };
  }
};
