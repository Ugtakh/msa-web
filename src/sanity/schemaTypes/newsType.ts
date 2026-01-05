import { ImageIcon, TextIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  icon: TextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title (Mongolian)",
      description: "Title Mongolian version",
      validation: (rule) => [
        rule.required().error("News title mongolian version is required"),
      ],
    }),
    defineField({
      name: "titleEng",
      type: "string",
      title: "Title (English)",
      description: "Title English version",
      validation: (rule) => [
        rule.required().error("News title english version is required"),
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
      title: "Content (Mongolian)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [{ title: "URL", name: "href", type: "url" }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        }),
      ],
      validation: (rule) => [
        rule.required().error("Mongolian content is required"),
      ],
    }),
    defineField({
      name: "contentEng",
      title: "Content (English)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [{ title: "URL", name: "href", type: "url" }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        }),
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
