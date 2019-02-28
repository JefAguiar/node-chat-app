const expect = require('expect');
const { generateMessage } = require('./message');
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