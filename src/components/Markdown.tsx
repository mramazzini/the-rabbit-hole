import markdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
const Markdown = ({ content }: { content: string }) => {
  const md = markdownIt().use(anchor);
  const html = md.render(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
