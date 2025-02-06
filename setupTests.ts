import '@testing-library/jest-dom';
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: "/mock-path",
  }),
  useParams:  vi.fn(),
}));
