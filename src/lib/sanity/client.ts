import { client } from "@/sanity/lib/client";

export const sanityFetch = async <const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags, // 60 секунд тутамд кэшийг шинэчилнэ (ISR)
}: {
  query: QueryString;
  params?: Record<string, any>;
  revalidate?: number | false;
  tags?: string[];
}) => {
  return client.fetch(query, params, {
    next: {
      revalidate: revalidate,
      tags: tags,
    },
  });
};
