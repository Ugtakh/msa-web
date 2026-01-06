import { defineType } from "sanity";

// We need will extend and import these in the custom input component later
export const PLANS = [
  { title: "ISO", value: "iso" },
  { title: "MNS", value: "mng" },
];

export const planType = defineType({
  name: "plan",
  title: "Plan",
  type: "string",
  options: {
    list: PLANS.map(({ title, value }) => ({ title, value })),
    layout: "radio",
  },
});
