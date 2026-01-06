import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partners",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Partner name",
      validation: (rule) => [rule.required().error("Partner name is required")],
    }),
    defineField({
      name: "nameEng",
      type: "string",
      description: "Partner name (English)",
      validation: (rule) => [
        rule.required().error("Partner name english is required"),
      ],
    }),
    defineField({
      name: "partnerLogo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => [
        rule.required().error("At least one image is required"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
