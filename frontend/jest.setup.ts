import "@testing-library/jest-dom";

// Mock Response for API route tests
global.Response = {
  json: (data: unknown, init?: { status?: number }) => ({
    json: () => Promise.resolve(data),
    status: init?.status || 200,
  }),
} as typeof Response;
