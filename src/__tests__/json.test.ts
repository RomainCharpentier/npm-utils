import { readJson, cleanJson, whatIsIt, adaptJsonArray, compareJson } from '../json';

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
 *  ----------------- AdaptJson
 */

test('adaptJsonArray_null', () => {
  expect(adaptJsonArray(null)).toBe(null);
});

test('adaptJsonArray_01', () => {
  const json = {
    'test1': {
      'test11': undefined,
      'test12': 'default'
    }
  }
  const expected = json;
  expect(adaptJsonArray(json)).toStrictEqual(expected);
});

test('adaptJsonArray_02', () => {
  const json = [
    {
      person: {
        lastName: 'default',
        firstName: 'default'
      },
      age: 'default'
    },
    {
      test: null
    }
  ]
  const expected = [
    {
      age: 'default',
      person: {
        firstName: 'default',
        lastName: 'default'
      },
      test: undefined
    },
    {
      age: undefined,
      person: {
        firstName: undefined,
        lastName: undefined
      },
      test: null
    }
  ]
  expect(adaptJsonArray(json)).toStrictEqual(expected);
});

test('adaptJsonArray_02', () => {
  const json = {
    key: [
      {
        name: 'default',
        value: 'default'
      },
      {
        test: 'default'
      }
    ]
  }
  const expected = {
    key: [
      {
        name: 'default',
        value: 'default',
        test: undefined
      },
      {
        test: 'default',
        name: undefined,
        value: undefined
      }
    ]
  }
  expect(adaptJsonArray(json)).toStrictEqual(expected);
});

/**
 *  ----------------- CompareJson
 */

 test('compareJson_false', () => {
  const j1 = [
    {
      person: {
        lastName: 'default',
        firstName: 'default'
      },
      age: 'default'
    },
    {
      test: null
    }
  ]
  const j2 = [
    {
      age: 'default',
      person: {
        firstName: 'default',
        lastName: 'default'
      },
      test: undefined
    },
    {
      age: undefined,
      person: {
        firstName: undefined,
        lastName: undefined
      },
      test: null
    }
  ]
  expect(compareJson(j1,j2)).toBe(false);
});

test('compareJson_true', () => {
 const j1 = [
   {
     person: {
       lastName: 'default',
       firstName: 'default'
     },
     age: 'default'
   },
   {
     test: null
   }
 ]
 const j2 = [
  {
    person: {
      lastName: 'default',
      firstName: 'default'
    },
    age: 'default'
  },
  {
    test: null
  }
]
 expect(compareJson(j1,j2)).toBe(true);
});

test('compareJson_true_order_attributes', () => {
 const j1 = [
   {
     person: {
       lastName: 'default',
       firstName: 'default'
     },
     age: 'default'
   },
   {
     test: null
   }
 ]
 const j2 = [
  {
    person: {
      firstName: 'default',
      lastName: 'default'
    },
    age: 'default'
  },
  {
    test: null
  }
]
 expect(compareJson(j1,j2)).toBe(true);
});

test('compareJson_true_order_array', () => {
 const j1 = [
   {
     person: {
       lastName: 'default',
       firstName: 'default'
     },
     age: 'default'
   },
   {
     test: null
   }
 ]
 const j2 = [
  {
    test: null
  },
  {
    person: {
      lastName: 'default',
      firstName: 'default'
    },
    age: 'default'
  }
]
 expect(compareJson(j1,j2)).toBe(true);
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