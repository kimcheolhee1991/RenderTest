// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import React from "react";
// import "@testing-library/jest-dom";
// import WindMode from "../component/WindMode";
// import userEvent from "@testing-library/user-event";
// export { default as userEvent } from "@testing-library/user-event";


// /*
// Originally, this was supposed to result in two fetches per test. 

// This is because there is a useEffect inside the code that does one automatically and one manually. 
// */
// const consoleError = jest.spyOn(console, "error").mockImplementation(() => {
//   return;
// });

// describe("WindMode componentテスト", () => {
//   beforeEach(() => {
//     consoleError.mockClear();
//   });
//   afterEach(() => {
//     consoleError.mockClear();
//   });

//   test("confirmHandlerボタンをクリックしるとサーバーにデータを送るのにbad request(200系以外の)", async () => {
//     const fetchMock = (global.fetch = jest
//       .fn()
//       .mockReturnValue({
//         json: () => Promise.resolve({ windSetting: 80 }),
//         status: 200,
//         ok: true,
//       })
//       .mockReturnValue({
//         json: () => Promise.resolve({ result: `connection disconnected.` }),
//         status: 500,
//         ok: true,
//       }));

//     const closeMock = jest.fn();
//     render(<WindMode close={closeMock} />);
//     expect(fetchMock).toHaveBeenCalledTimes(1);

//     fireEvent.click(screen.getByText(/適用/i));

//     expect(fetchMock).toHaveBeenCalledTimes(2);

//     // expect(consoleError).toBeCalled();
//     consoleError.mockClear();
//   });

  
// });
