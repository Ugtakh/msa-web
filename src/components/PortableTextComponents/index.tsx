import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

// Custom components for rendering portable text
const components: PortableTextComponents = {
  types: {
    image: (props) => {
      const { value } = props;
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          className="rounded-lg w-full h-auto my-6"
          src={urlFor(value)
            .width(800)
            .height(600)
            .quality(80)
            .auto("format")
            .url()}
          alt={value?.alt || ""}
          width={800}
          height={600}
        />
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-5 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          className="text-blue-600 hover:underline"
          target={!value?.href?.startsWith("/") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: any;
  className?: string;
}

export default function PortableTextRenderer({
  value,
  className = "",
}: PortableTextRendererProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
