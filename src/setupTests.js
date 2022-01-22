// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
import enableHooks from 'jest-react-hooks-shallow';
// pass an instance of jest to `enableHooks()`enableHooks(jest);

//fetchMock.enableMocks();
enableHooks(jest);
jest.setTimeout(20000)