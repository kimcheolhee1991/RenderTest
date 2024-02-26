import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import FetchRenderTest from "./FetchRenderTest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const handlers = [
	http.put("https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test", () => {
		return HttpResponse.json({ msg: "Invalid request" }, { status: 400 }); // Simulate error response
	}),
];
const server = setupServer(...handlers);

describe("FetchRenderTest component tests", () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.clearAllMocks();
	});
	afterAll(() => server.close());

	test("renders ErrorModal when fetch fails", async () => {
		render(<FetchRenderTest />);

		const startButton = screen.getByText(/Testing Start/i);
		userEvent.click(startButton);

		// Wait for the ErrorModal to render
		await waitFor(() => {
			const errorModal = screen.getByRole("dialog");
			expect(errorModal).toBeInTheDocument();
		});

		// Verify the modal content
		const modalTitle = screen.getByText("Modal, Dialog Test");
		expect(modalTitle).toBeInTheDocument();

		// Verify the close button is rendered
		const closeButton = screen.getByRole("button", { name: /確認/i });
		expect(closeButton).toBeInTheDocument();
	});

	test("doesn't render the error modal when fetch succeeds", async () => {
		server.use(
			http.put(
				"https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test",
				() => {
					return HttpResponse.json({ msg: "Invalid request" }, { status: 200 });
				}
			)
		);

		render(<FetchRenderTest />);

		const startButton = screen.getByText(/Testing Start/i);
		userEvent.click(startButton);

		// Wait for the ErrorModal to render
		await waitFor(() => {
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});
	});

	test("handles network error gracefully", async () => {
		server.use(
			http.put(
				"https://65d1ac70987977636bfb57a9.mockapi.io/api/v1/test",
				() => {
					return HttpResponse.json(null, { status: 500 }); // Simulate error response
				}
			)
		);

		render(<FetchRenderTest />);

		const startButton = screen.getByText(/Testing Start/i);
		userEvent.click(startButton);

		// Wait for the ErrorModal to render
		await waitFor(() => {
			const errorModal = screen.getByRole("dialog");
			expect(errorModal).toBeInTheDocument();
		});

		// Verify the modal content
		const modalTitle = screen.getByText("Modal, Dialog Test");
		expect(modalTitle).toBeInTheDocument();
	});

	test("closes the error modal on confirmation button click", async () => {
		render(<FetchRenderTest />);

		const startButton = screen.getByText(/Testing Start/i);
		userEvent.click(startButton);

		// Wait for the ErrorModal to render
		await waitFor(() => {
			const errorModal = screen.getByRole("dialog");
			expect(errorModal).toBeInTheDocument();
		});

		const confirmButton = screen.getByRole("button", { name: /確認/i });
		userEvent.click(confirmButton);

		// Error modal should be closed
		await waitFor(() => {
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});
	});
});
