type FormatTextParams = {
  text: string;
  className?: {
    underline?: string;
    bold?: string;
    both?: string;
  };
};

export const formatTextWithStyles = ({
  text,
  className = {},
}: FormatTextParams): React.ReactNode => {
  if (!text) {
    return null;
  }

  let underlineClass = 'underline';
  if (className.underline) {
    underlineClass = className.underline;
  }

  let boldClass = 'bold';
  if (className.bold) {
    boldClass = className.bold;
  }

  let bothClass = 'both';
  if (className.both) {
    bothClass = className.both;
  }

  const regex = /\[bu\](.*?)\[\/bu\]|\[u\](.*?)\[\/u\]|\[b\](.*?)\[\/b\]/g;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    if (match[1] !== undefined) {
      // both bold and underline group
      parts.push(
        <span key={`bu-${key++}`} className={bothClass}>
          {match[1]}
        </span>,
      );
    } else if (match[2] !== undefined) {
      // underline group
      parts.push(
        <span key={`u-${key++}`} className={underlineClass}>
          {match[2]}
        </span>,
      );
    } else if (match[3] !== undefined) {
      // bold group
      parts.push(
        <span key={`b-${key++}`} className={boldClass}>
          {match[3]}
        </span>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? p.replace(/\s{2,}/g, ' ') : p,
      )}
    </>
  );
};
