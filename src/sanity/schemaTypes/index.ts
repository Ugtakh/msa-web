import { type SchemaTypeDefinition } from "sanity";
import newsType from "./newsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [newsType],
};
