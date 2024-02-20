import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FetchRenderTest from "./FetchRenderTest";


/*
Originally, when rendered, the useEffect does a fetch inside of it to get the value from the server and sets it to the screen as the initial value. 
After that, if we want to apply a new value, we fetch it again. 


*/
const consoleError = jest.spyOn(console, "error").mockImplementation(() => {
  return;
});
describe("TimerPreference componentテスト", () => {
  beforeEach(() => {
    consoleError.mockClear();  // <- ACT prints a warning and prepares to clear it 
  });
  afterEach(() => {
    consoleError.mockClear();// <- ACT prints a warning and prepares to clear it 
  });
test("renders ErrorModal when fetch fails", async () => {
  global.fetch = jest.fn().mockReturnValue({
    json: () => Promise.resolve({ permission: false }),
    status: 500,
    method: "GET",
    ok: true,
  });

  render(<FetchRenderTest />);

  await waitFor(() => fetch("https://jsonplaceholder.typicode.com/users/1"));
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const modaltitle =  screen.findByRole("dialog");
  await waitFor(() => console.log(modaltitle));

  // const modaltitle =  await screen.findByRole("dialog"); <- try No.1  fail  
  // await waitFor(()=> expect(modaltitle).toBeInTheDocument())  <-- try No.2 fail

  const modalButton = screen.findByText(/確認/i, { exact: false });
  await waitFor(() => console.log(modalButton));


  consoleError.mockClear();
});
});
