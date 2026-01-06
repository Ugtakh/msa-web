import { BinaryDocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const standardType = defineType({
  name: "standard",
  title: "Standards",
  type: "document",
  icon: BinaryDocumentIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Standard name",
      validation: (rule) => [rule.required().error("Partner name is required")],
    }),
    defineField({
      name: "nameEng",
      type: "string",
      description: "Standard name (English)",
      validation: (rule) => [
        rule.required().error("Standard name is required"),
      ],
    }),
    defineField({
      name: "code",
      type: "string",
      description: "Standard Code",
      validation: (rule) => [
        rule.required().error("Standard Code is required"),
      ],
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "ISO", value: "iso" },
          { title: "MNG", value: "mng" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "standardPdf",
      type: "file",
      validation: (rule) => [
        rule.required().error("At least one image is required"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      code: "code",
    },
    prepare({ title, code }) {
      return {
        title,
        code,
      };
    },
  },
});
