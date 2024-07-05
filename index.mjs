import express from "express";
import arcjet, { detectBot, shield } from "@arcjet/node";
import dotenv from "dotenv";
import { Permit } from "permitio";
dotenv.config();

const { ARCJET_KEY, PDP_URL, PDP_API_KEY } = process.env;

const app = express();
const port = 3000;
const USER = "example@protect.app";
const OTHER_USER = "other@protect.app";
const ITEMS = [
  { id: 1, name: "Public Item", owner: USER, private: false },
  { id: 2, name: "Shared Item", owner: OTHER_USER, private: false },
  { id: 3, name: "Private Item", owner: USER, private: true },
  { id: 4, name: "Blocked Item", owner: OTHER_USER, private: true },
];

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    detectBot({
      mode: "DRY_RUN",
      patterns: {
        add: {
          "GoogleBot\\/": "LIKELY_AUTOMATED",
        },
      },
    }),
    shield({ mode: "LIVE" }),
  ],
});

console.log(PDP_URL)

const permit = new Permit({
  pdp: PDP_URL,
  token: PDP_API_KEY,
});

const authorizeList = async (req, list) => {
  // Get the bot detection decision from ArcJet
  console.log("authorizeList")
  const decision = await aj.protect(req);
  const isBot = decision.results.find((r) => r.reason.isBot());
  const {
    reason: { botType = false },
  } = isBot;

  // Check authorization for each item in the list
  // For each user, we will add the botType attribute
  // For each resource, we will add the item attributes
  const authorizationFilter = await permit.bulkCheck(
    list.map((item) => ({
      user: {
        key: USER,
        attributes: {
          botType,
        },
      },
      action: "read",
      resource: {
        type: "Content_Item",
        attributes: {
          ...item,
        },
      },
    }))
  );

  return list.filter((item, index) => authorizationFilter[index]);
};

app.get("/", async (req, res, next) => {
  console.log("GET /")
  const items = await authorizeList(req, ITEMS);
  res
    .type("text/plain")
    .send(items.map(({ id, name }) => `${id}: ${name}`).join("\r\n"));
});

app.listen(port, "127.0.0.1", () => {
  console.log(`FGA Bot Protection app listening on port ${port}`);
});
