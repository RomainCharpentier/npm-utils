import { readJson, cleanJson, whatIsIt } from '../json';

/**
 *  ----------------- ReadJson
 */

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

/**
 *  ----------------- CleanJson
 */

test('cleanJson_01', () => {
  expect(cleanJson({})).toStrictEqual(undefined);
});

test('cleanJson_02', () => {
  expect(cleanJson(['test1', undefined, 'test2', null])).toStrictEqual(['test1', 'test2']);
});

test('cleanJson_03', () => {
  const json = {
    'test1': {
      'test11': undefined,
      'test12': 'default'
    },
    'test2': undefined,
    'test3': {
      'test31': {
        'test311': undefined,
      },
      'test32': {
        'test321': 'default'
      }
    }
  }
  const expected = {
    'test1': {
      'test12': 'default'
    },
    'test3': {
      'test32': {
        'test321': 'default'
      }
    }
  }
  expect(cleanJson(json)).toStrictEqual(expected);
});

/**
 *  ----------------- WhatIsIt
 */

test('whatIsIt_null', () => {
  expect(whatIsIt(null)).toBe('null');
});

test('whatIsIt_undefined', () => {
  expect(whatIsIt(undefined)).toBe('undefined');
});

test('whatIsIt_string', () => {
  expect(whatIsIt('')).toBe('string');
});

test('whatIsIt_array', () => {
  expect(whatIsIt([])).toBe('array');
});

test('whatIsIt_object', () => {
  expect(whatIsIt({})).toBe('object');
});