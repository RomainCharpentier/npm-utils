import { readJson, cleanJson } from '../json';

test('readJson_01', () => {
  expect(readJson({test1: 'test2'}, 'test1')).toBe('test2');
});

test('readJson_02', () => {
  expect(readJson({test1: {test2: 'test3'}}, 'test1.test2')).toBe('test3');
});

test('readJson_03', () => {
  expect(readJson({test1: {test2: 'test3'}}, 'test0.test2')).toBe(undefined);
});

test('readJson_04', () => {
  expect(readJson({test1: {test2: 'test3'}}, 'test1')).toStrictEqual({test2: 'test3'});
});

test('cleanJson', () => {
  expect(cleanJson([test, undefined])).toStrictEqual([test]);
});