// jest.setup.js
import '@testing-library/jest-dom';

// Basic fetch mock
global.fetch = jest.fn();