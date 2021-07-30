const sendMail = (mail: string) => `Send mail to ${mail}`;

const sendSms = (number: string) => `Send sms to ${number}`;

export const readJson = (json: any, attributes: string) => {
  const splitted: string[] = attributes.split('.');
  try {
    return splitted.reduce((j1, j2) => j1[j2], json);
  } catch (e) {
    return undefined;
  }
}

export const cleanArray = (json: any) => {
  return json.filter((value: any) => value !== undefined);
}

export const cleanJson = (json: any) => {
  if (json.length > 0) {
    return cleanArray(json);
  } else {
    return JSON.parse(JSON.stringify(json));
  }
}

export { sendMail, sendSms };