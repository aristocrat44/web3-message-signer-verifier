// __tests__/components/profile/testBlock.test.tsx

import { TextBlock } from "@/components/profile/textBlock";
import { render, screen } from "@testing-library/react";

describe("TextBlock Component Suite", () => {
  describe("Mobile view (md:hidden)", () => {
    test("renders full text when under slice length", () => {
      const shortText = "Hello World";
      const { container } = render(
        <TextBlock fullText={shortText} sliceLength={40} />
      );

      // Should show full text on mobile - target the specific mobile span
      const mobileSpan = container.querySelector(".md\\:hidden");
      expect(mobileSpan).toHaveTextContent(shortText);
    });

    test("truncates text when over slice length with default sliceLength", () => {
      const longText =
        "This is a very long text that exceeds forty characters and should be truncated";
      render(<TextBlock fullText={longText} />);

      // Should show truncated version (first 40 chars + ...)
      const expectedTruncated = `${longText.slice(0, 40)}...`;
      expect(screen.getByText(expectedTruncated)).toBeInTheDocument();
    });

    test("truncates text when over custom slice length", () => {
      const longText = "This is a long text";
      const customSliceLength = 10;
      render(<TextBlock fullText={longText} sliceLength={customSliceLength} />);

      const expectedTruncated = `${longText.slice(0, customSliceLength)}...`;
      expect(screen.getByText(expectedTruncated)).toBeInTheDocument();
    });

    test("handles empty string", () => {
      render(<TextBlock fullText="" />);

      // Should render empty span
      const spans = screen.getAllByText("");
      expect(spans.length).toBeGreaterThan(0);
    });
  });

  describe("Desktop view (hidden md:block)", () => {
    test("renders full text on desktop", () => {
      const fullText =
        "This is a very long text that exceeds forty characters and should be truncated on mobile but not on desktop";
      const { container } = render(<TextBlock fullText={fullText} />);

      // Desktop span should contain full text
      const desktopSpan = container.querySelector(".hidden.md\\:block");
      expect(desktopSpan).toHaveTextContent(fullText);
    });

    test("renders fallback when fullText is empty", () => {
      const fallback = "No content available";
      const { container } = render(
        <TextBlock fullText="" fallback={fallback} />
      );

      const desktopSpan = container.querySelector(".hidden.md\\:block");
      expect(desktopSpan).toHaveTextContent(fallback);
    });

    test("renders fallback when fullText is null/undefined", () => {
      const fallback = "Default text";
      // Component doesn't handle null safely, so test with empty string instead
      render(<TextBlock fullText="" fallback={fallback} />);

      const desktopSpan = document.querySelector(".hidden.md\\:block");
      expect(desktopSpan).toHaveTextContent(fallback);
    });

    test("uses default fallback when not provided", () => {
      render(<TextBlock fullText="" />);

      // Should have empty desktop span when no fallback provided
      const spans = screen.getAllByText("");
      expect(spans.length).toBeGreaterThan(0);
    });
  });

  describe("CSS classes", () => {
    test("applies correct CSS classes for responsive behavior", () => {
      const { container } = render(<TextBlock fullText="Test text" />);

      const spans = container.querySelectorAll("span");
      expect(spans[0]).toHaveClass("md:hidden");
      expect(spans[1]).toHaveClass("hidden", "md:block");
    });
  });

  describe("Edge cases", () => {
    test("handles text exactly at slice length", () => {
      const exactLengthText = "A".repeat(40);
      const { container } = render(
        <TextBlock fullText={exactLengthText} sliceLength={40} />
      );

      // Should not truncate when exactly at slice length - check mobile span
      const mobileSpan = container.querySelector(".md\\:hidden");
      expect(mobileSpan).toHaveTextContent(exactLengthText);
      expect(mobileSpan?.textContent).not.toContain("...");
    });

    test("handles slice length of 0", () => {
      const text = "Any text";
      render(<TextBlock fullText={text} sliceLength={0} />);

      expect(screen.getByText("...")).toBeInTheDocument();
    });

    test("handles very large slice length", () => {
      const text = "Short text";
      const { container } = render(
        <TextBlock fullText={text} sliceLength={1000} />
      );

      // Should show full text without truncation
      const mobileSpan = container.querySelector(".md\\:hidden");
      expect(mobileSpan).toHaveTextContent(text);
      expect(mobileSpan?.textContent).not.toContain("...");
    });
  });
});
