import { Parser } from "html-to-react";

export default function DynamicContent({ content }: { content: string }) {
  const reactElement = Parser().parse(content);

  return <div>{reactElement}</div>;
}
