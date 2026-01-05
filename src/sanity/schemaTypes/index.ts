import { type SchemaTypeDefinition } from "sanity";
import { bannerType } from "./bannerTypes";
import { newsType } from "./newsType";
import { articleType } from "./articleType";
import { partnerType } from "./partnerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerType, newsType, articleType, partnerType],
};
