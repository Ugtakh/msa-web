import { PortableText, PortableTextReactComponents } from "@portabletext/react";

const PtComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset.url}
        alt={value.alt || ""}
        className="my-4 rounded-lg"
      />
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value.href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
};

export default PtComponents;
