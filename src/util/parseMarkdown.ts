import DOMPurify from "dompurify";
import { marked } from "marked";

export const parseMarkdown = (text: string) => {
  const parsedMarkdown = marked.parse(text) as string;
  const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);

  return sanitisedMarkdown;
};
