import { render, screen, waitFor } from "@testing-library/svelte";
import { expect, Mock, vitest } from "vitest";

import Todos from "./Todos.svelte";

test("shows Loading", () => {
  global.fetch = vitest.fn(() =>
    Promise.resolve({
      json: () => new Promise((_) => {}),
    })
  ) as Mock;

  render(Todos);

  const loading = screen.getByText("Loading...");
  expect(loading).toBeDefined();
});

test("shows Todos", async () => {
  global.fetch = vitest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          },
        ]),
    })
  ) as Mock;

  render(Todos);

  const cells = await screen.findAllByRole("cell");
  expect(cells).toHaveLength(2);
  expect(cells[0].innerHTML).toBe("1");
  expect(cells[1].innerHTML).toBe("delectus aut autem");
});

test("shows fetch error", async () => {
  // mock fetch error
  global.fetch = vitest.fn(() =>
    Promise.reject({ message: "Network error" })
  ) as Mock;

  render(Todos);

  const errorMessage = await screen.findByRole("alert");
  expect(errorMessage.innerHTML).toBe("Error: Network error");
});
