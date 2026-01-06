import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: TextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title (Mongolian)",
      description: "Title Mongolian version",
      validation: (rule) => [
        rule.required().error("Article title mongolian version is required"),
      ],
    }),
    defineField({
      name: "titleEng",
      type: "string",
      title: "Title (English)",
      description: "Title English version",
      validation: (rule) => [
        rule.required().error("Article title english version is required"),
      ],
    }),
    defineField({
      name: "thumbnailUrl",
      type: "image",
      title: "Thumbnail Image",
      options: {
        hotspot: true,
      },
      validation: (rule) => [
        rule.required().error("At least one image is required"),
      ],
    }),
    defineField({
      name: "content",
      type: "object",
      title: "Content (Mongolian)",
      description: "Content Mongolian version",
      fields: [
        {
          name: "type",
          type: "string",
          readOnly: true,
        },
        {
          name: "content",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
          hidden: true, // Студио дээр шууд засах боломжгүй, зөвхөн хадгалах зориулалттай
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: "contentEng",
      type: "object",
      title: "Content (English)",
      description: "Content English version",
      fields: [
        {
          name: "type",
          type: "string",
          readOnly: true,
        },
        {
          name: "content",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
          hidden: true,
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
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
      subtitle: "titleEng",
      media: "thumbnailUrl",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, subtitle, media, publishedAt } = selection;
      return {
        title: title,
        subtitle: publishedAt
          ? `${subtitle} • ${new Date(publishedAt).toLocaleDateString("mn-MN")}`
          : subtitle,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
