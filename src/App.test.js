const add = (a, b) => {
  return a + b;
};

test('should sum two numbers', () => {
  expect(add(1, 2)).toBe(3);
});
