import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SentenceCards from "./sentence-cards";

describe("SentenceCards", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders empty state correctly", () => {
    render(<SentenceCards />);
    expect(screen.getByText("Sentence Cards")).toBeInTheDocument();
    expect(screen.getByLabelText("Add a new sentence")).toBeInTheDocument();
    expect(screen.getByLabelText("Search sentences")).toBeInTheDocument();
  });

  test("adds a new sentence", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);

    expect(screen.getByText("Test sentence")).toBeInTheDocument();
  });

  test("prevents duplicate sentences", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);
    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);

    expect(screen.getAllByText("Test sentence")).toHaveLength(1);
  });

  test("deletes a sentence", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);

    const deleteButton = screen.getByRole("button", {
      name: /delete sentence/i,
    });
    await userEvent.click(deleteButton);

    expect(screen.queryByText("Test sentence")).not.toBeInTheDocument();
  });

  test("filters sentences based on search term", async () => {
    render(<SentenceCards />);

    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Apple pie");
    await userEvent.click(addButton);
    await userEvent.type(input, "Banana bread");
    await userEvent.click(addButton);

    const searchInput = screen.getByLabelText("Search sentences");
    await userEvent.type(searchInput, "apple");

    expect(screen.getByText("Apple pie")).toBeInTheDocument();
    expect(screen.queryByText("Banana bread")).not.toBeInTheDocument();
  });

  test("adds sentence on Enter key press", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");

    await userEvent.type(input, "Test sentence{enter}");
    expect(screen.getByText("Test sentence")).toBeInTheDocument();
  });

  test("persists sentences in localStorage", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);

    const savedSentences = JSON.parse(
      localStorage.getItem("sentences") || "[]"
    );
    expect(savedSentences).toHaveLength(1);
    expect(savedSentences[0].text).toBe("Test sentence");
  });

  test("shows error for empty sentence", async () => {
    render(<SentenceCards />);
    const addButton = screen.getByText("Add Sentence");

    await userEvent.click(addButton);
    expect(screen.getByText("Please enter a sentence")).toBeInTheDocument();
  });

  test("shows error for duplicate sentence", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);
    await userEvent.type(input, "Test sentence");
    await userEvent.click(addButton);

    expect(
      screen.getByText("That sentence was already added!")
    ).toBeInTheDocument();
  });

  test("shows error for sentence exceeding maximum length", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    const longSentence = "a".repeat(281);
    await userEvent.type(input, longSentence);
    await userEvent.click(addButton);

    expect(
      screen.getByText("Sentence is too long (maximum 280 characters)")
    ).toBeInTheDocument();
  });

  test("shows remaining character count", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");

    expect(screen.getByText("280 characters left")).toBeInTheDocument();

    await userEvent.type(input, "Hello");
    expect(screen.getByText("275 characters left")).toBeInTheDocument();
  });

  test("shows character count in red when exceeding limit", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");

    const longSentence = "a".repeat(281);
    await userEvent.type(input, longSentence);

    const charCount = screen.getByText("-1 characters left");
    expect(charCount).toHaveClass("text-red-500");
  });

  test("clears input and error after successful addition", async () => {
    render(<SentenceCards />);
    const input = screen.getByLabelText("Add a new sentence");
    const addButton = screen.getByText("Add Sentence");

    await userEvent.click(addButton);
    expect(screen.getByText("Please enter a sentence")).toBeInTheDocument();

    await userEvent.type(input, "Valid sentence");
    await userEvent.click(addButton);

    expect(input).toHaveValue("");
    expect(
      screen.queryByText("Please enter a sentence")
    ).not.toBeInTheDocument();
  });
});
