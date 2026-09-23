export type CopyPart = {
  text: string;
  highlight?: true;
};

export function HighlightedParts({
  parts,
}: {
  parts: readonly CopyPart[];
}) {
  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <strong key={i} className="font-extrabold text-[#9428ff]">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
