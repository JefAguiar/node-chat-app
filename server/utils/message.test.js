const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', () => {

    it('should generate correct message object', () => {

        const text = 'Test Message';
        const from = 'From Test';

        const message = generateMessage(from, text);
        expect(message).toMatchObject({ text, from });
        expect(typeof(message.createdAt)).toBe('number');
        expect(message.createdAt).toBeTruthy();
    });
});

describe('generateLocationMessage', () => {

    it('should generate correct message object', () => {

        const latitude = 1010101;
        const longitude = 12301230.
        const from = 'From Test';

        const message = generateLocationMessage(from, latitude, longitude);
        expect(message).toMatchObject({ from, url: `https://www.google.com/maps?q=${latitude},${longitude}`  });
        expect(typeof(message.createdAt)).toBe('number');
        expect(message.createdAt).toBeTruthy();
    });
});