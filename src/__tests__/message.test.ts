import { sendMail, sendSms } from '../index';

test('sendMail', () => {
  expect(sendMail('Carl')).toBe('Send mail to Carl');
});

test('sendSms', () => {
  expect(sendSms('Carl')).toBe('Send sms to Carl');
});