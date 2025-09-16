// __tests__/app/profile.test.tsx
import ProfilePage from "@/app/profile/page";
import { render, screen } from "@testing-library/react";

// mock dynamic provider
jest.mock("@/providers/DynamicProvider", () => {
  const DynamicProvider = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dynamic-provider">{children}</div>
  );
  DynamicProvider.displayName = "DynamicProvider";
  return DynamicProvider;
});

// Mock ProfileContent
jest.mock("@/components/profile/content", () => {
  return {
    ProfileContent: () => (
      <div data-testid="profile-content">Profile Content</div>
    ),
  };
});

describe("Profile Page Suite", () => {
  it("renders ProfileContent inside DynamicProvider", () => {
    render(<ProfilePage />);

    // DynamicProvider should exist
    expect(screen.getByTestId("dynamic-provider")).toBeInTheDocument();

    // ProfileContent should render inside
    expect(screen.getByTestId("profile-content")).toBeInTheDocument();
  });
});
