export const readJson = (json: any, attributes: string): any => {
  const splitted: string[] = attributes.split('.');
  try {
    return splitted.reduce((j1, j2) => j1[j2], json);
  } catch (e) {
    return undefined;
  }
}

export const cleanArray = (json: any): any => {
  return json.filter((value: any) => value);
}

export const whatIsIt = (object: any): string => {
  if (object === null) {
    return 'null';
  } else if (object === undefined) {
    return 'undefined';
  } else if (typeof object === 'string' || object instanceof String) {
    return 'string';
  } else if (object instanceof Array) {
    return 'array';
  } else if (object instanceof Object) {
    return 'object';
  } else {
    return 'don\'t know';
  }
}

/**
 * Clean by removing all empty object, undefined and null
 * @param json 
 * @returns 
 */
export const cleanJson = (json: any): any => {
  if (!json) {
    return json;
  } if (json instanceof Array) {
    return json.filter((value: any) => value).map((value: any) => cleanJson(value));
  } else if (json instanceof Object) {
    // Removes unused attributes
    let keys = Object.keys(json);
    keys.forEach((key: string) => {
      const cleaned: any = cleanJson(json[key]);
      if (cleaned) {
        json[key] = cleaned;
      } else {
        delete json[key];
      }
    });
    keys = Object.keys(json);
    if (!keys || keys.length === 0) {
      return undefined;
    }
    
    return JSON.parse(JSON.stringify(json));
  } else {
    return json;
  }
}

/**
 * Adapts each array values with the same structure
 * @param json 
 * @returns 
 */
export const adaptJsonArray = (json: any): any => {
  if (!json) {
    return json;
  } if (json instanceof Array) {
    // Each value of array has the same structure (undefined is the default value)
    return json.map(adaptJsonArray).map(j => json.reduce((j1, j2) => {
      Object.keys(j2).forEach(key => { j1[key] = j1[key] !== undefined ? j1[key] : undef(j2[key]) });
      return j1;
    }, j));
  } else if (json instanceof Object) {
    // Searches if an attribute is an array to adapt it
    return Object.keys(json).map(key => ({ [key]: adaptJsonArray(json[key]) })).reduce((v1, v2) => ({ ...v1, ...v2 }), {});
  } else {
    return json;
  }
}

/**
 * Replaces all values with undefined
 * @param json json object
 * @returns json with undefined values
 */
const undef = (json: any): any => {
  if (!json) {
    return undefined;
  } if (json instanceof Array) {
    return json.map(undef);
  } else if (json instanceof Object) {
    return Object.keys(json).map(key => ({ [key]: undef(json[key]) })).reduce((v1, v2) => ({ ...v1, ...v2 }), {});
  } else {
    return undefined;
  }
}