import { renderSafeMarkdown } from '@/utils/markdown';

type Props = { content: string };

export function Message({ content }: Props) {
  const safeHtml = renderSafeMarkdown(content);
  return (
    <div
      className="prose prose-sm md:prose-base max-w-none break-words"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
