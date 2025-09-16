interface textBlockProps {
  fullText: string;
  sliceLength?: number;
  fallback?: string;
}

export const TextBlock = ({
  fullText,
  sliceLength = 40,
  fallback = "",
}: textBlockProps) => (
  <>
    <span className="md:hidden">
      {fullText.length > sliceLength
        ? `${fullText.slice(0, sliceLength)}...`
        : fullText}
    </span>
    <span className="hidden md:block">{fullText || fallback}</span>
  </>
);
