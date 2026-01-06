import { type SchemaTypeDefinition } from "sanity";
import { bannerType } from "./bannerTypes";
import { newsType } from "./newsType";
import { partnerType } from "./partnerType";
import { standardType } from "./standardType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerType, newsType, partnerType, standardType],
};
