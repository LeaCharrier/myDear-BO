const http = require('http');

const users = {
    4: {name: 'Mark'},
    5: {name: 'Paul'},
};


describe('app', () => {
  it('fetch correctly', async () => {
    const response = await fetch('http://157.230.219.232/api/service/')
    const data = await response.text();

    expect(data).not.toBe(null);
  });
});
