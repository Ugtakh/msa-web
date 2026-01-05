import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Title Mongolian version",
      validation: (rule) => [
        rule.required().error("Banner title mongolian version is required"),
      ],
    }),
    defineField({
      name: "titleEng",
      type: "string",
      description: "Sub title English version",
      validation: (rule) => [
        rule.required().error("Banner title english version is required"),
      ],
    }),
    defineField({
      name: "subTitle",
      type: "string",
      description: "Sub title Mongolian version",
      validation: (rule) => [rule.required().error("Sub Title is required.")],
    }),
    defineField({
      name: "subTitleEng",
      type: "string",
      description: "Sub title English version",
      validation: (rule) => [rule.required().error("Sub Title is required.")],
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "Banner description Mongolian version",
    }),
    defineField({
      name: "descriptionEng",
      type: "text",
      rows: 4,
      description: "Banner description English version",
    }),

    defineField({
      name: "bannerUrl",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => [
        rule.required().error("At least one image is required"),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "When the news was published",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => [
        rule.required().error("Published date is required"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subTitle",
      description: "description",
      media: "image",
    },
    prepare({ title, subtitle, media, description }) {
      return {
        title,
        subtitle,
        description,
        media,
      };
    },
  },
});
