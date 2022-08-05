import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("Test over App", () => {
  it("renders the component", () => {
    render(<App />);
    screen.getByText("Unit testing rtl");
    screen.getByText("Fetch data");
  });

  xit("should fetch have to be call", () => {
    render(<App />);

    const fetchMock = () => ({
      json: () =>
        Promise.resolve({
          data: {
            categories: [],
            created_at: "2020-01-05 13:42:26.194739",
            icon_url:
              "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
            id: "5irdrpeeR0-zgD26yHYaQg",
            updated_at: "2020-01-05 13:42:26.194739",
            url: "https://api.chucknorris.io/jokes/5irdrpeeR0-zgD26yHYaQg",
            value:
              "Chuck Norris was once so drunk that he tripped and the ejecta that was launched into outer space formed the moon.",
          },
        }),
    });

    jest.spyOn(window, "fetch").mockImplementation(fetchMock);
    const fetchButton = screen.getByText("Fetch data");
    fireEvent.click(fetchButton);

    expect(fetchMock).toHaveBeenCalled();
  });

  it("should data have to be render", async () => {
    render(<App />);

    const fetchMock = () => ({
      json: () =>
        Promise.resolve({
          value:
            "Chuck Norris was once so drunk that he tripped and the ejecta that was launched into outer space formed the moon.",
        }),
    });

    jest.spyOn(window, "fetch").mockImplementation(fetchMock);
    const fetchButton = screen.getByText("Fetch data");
    fireEvent.click(fetchButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    screen.getByText(
      "Chuck Norris was once so drunk that he tripped and the ejecta that was launched into outer space formed the moon."
    );
  });

  it("should data have to change", async () => {
    render(<App />);

    const mockData = {
      value:
        "Chuck Norris was once so drunk that he tripped and the ejecta that was launched into outer space formed the moon.",
    };
    const fetchMock = () => ({
      json: () =>
        Promise.resolve({
          value: mockData.value,
        }),
    });

    jest.spyOn(window, "fetch").mockImplementation(fetchMock);
    const fetchButton = screen.getByText("Fetch data");
    fireEvent.click(fetchButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
   
    screen.getByText(
      "Chuck Norris was once so drunk that he tripped and the ejecta that was launched into outer space formed the moon."
    );
   
    mockData.value = "Chuck Norris once again.";
    fireEvent.click(fetchButton);
   
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    
    screen.getByText("Chuck Norris once again.");
  });
});
