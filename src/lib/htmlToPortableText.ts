// lib/htmlToPortableText.ts

export function htmlToPortableText(html: string) {
  if (!html || html === "<p></p>") return [];

  const blocks: any[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const processNode = (node: Node, marks: string[] = []): any[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.trim()) {
        return [{ _type: "span", text, marks }];
      }
      return [];
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      let children: any[] = [];
      Array.from(element.childNodes).forEach((child) => {
        children.push(...processNode(child, marks));
      });

      switch (tagName) {
        case "p":
          return [
            {
              _type: "block",
              _key: Math.random().toString(36).substr(2, 9),
              style: "normal",
              children:
                children.length > 0
                  ? children
                  : [{ _type: "span", text: "", marks: [] }],
              markDefs: [],
            },
          ];

        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return [
            {
              _type: "block",
              _key: Math.random().toString(36).substr(2, 9),
              style: tagName,
              children:
                children.length > 0
                  ? children
                  : [{ _type: "span", text: "", marks: [] }],
              markDefs: [],
            },
          ];

        case "strong":
        case "b":
          return Array.from(element.childNodes).flatMap((child) =>
            processNode(child, [...marks, "strong"])
          );

        case "em":
        case "i":
          return Array.from(element.childNodes).flatMap((child) =>
            processNode(child, [...marks, "em"])
          );

        case "mark":
          return Array.from(element.childNodes).flatMap((child) =>
            processNode(child, [...marks, "highlight"])
          );

        case "ul":
          return Array.from(element.children).map((li) => {
            const liChildren = Array.from(li.childNodes).flatMap((child) =>
              processNode(child, marks)
            );
            return {
              _type: "block",
              _key: Math.random().toString(36).substr(2, 9),
              style: "normal",
              listItem: "bullet",
              children:
                liChildren.length > 0
                  ? liChildren
                  : [{ _type: "span", text: "", marks: [] }],
              markDefs: [],
            };
          });

        case "ol":
          return Array.from(element.children).map((li) => {
            const liChildren = Array.from(li.childNodes).flatMap((child) =>
              processNode(child, marks)
            );
            return {
              _type: "block",
              _key: Math.random().toString(36).substr(2, 9),
              style: "normal",
              listItem: "number",
              children:
                liChildren.length > 0
                  ? liChildren
                  : [{ _type: "span", text: "", marks: [] }],
              markDefs: [],
            };
          });

        case "blockquote":
          return Array.from(element.childNodes).flatMap((child) => {
            const processed = processNode(child, marks);
            return processed.map((block) => ({
              ...block,
              style: "blockquote",
            }));
          });

        case "a":
          const href = element.getAttribute("href") || "";
          const linkKey = Math.random().toString(36).substr(2, 9);
          const linkMarks = [...marks, linkKey];
          const linkChildren = Array.from(element.childNodes).flatMap((child) =>
            processNode(child, linkMarks)
          );
          // Add markDef to children
          return linkChildren.map((child) => ({
            ...child,
            markDefs: [
              {
                _key: linkKey,
                _type: "link",
                href: href,
              },
            ],
          }));

        case "br":
          return [{ _type: "span", text: "\n", marks }];

        default:
          return children;
      }
    }

    return [];
  };

  Array.from(doc.body.childNodes).forEach((node) => {
    const processed = processNode(node);
    blocks.push(...processed);
  });

  return blocks.filter((block) => block);
}
