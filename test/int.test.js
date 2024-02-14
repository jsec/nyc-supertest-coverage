const server = require('../src/server')()
const axios = require('axios')
const nock = require('nock')
const waitOn = require("wait-on")

let app

beforeAll(async () => {
  app = server.listen(3033, () => {
    console.log('Server running')
  })

  await waitOn({ resources: ['tcp:3033'] })
})

afterAll(() => {
  app.close()
})

const BASE_URL = 'http://localhost:3033'

const scope = nock('https://jsonplaceholder.typicode.com')
  .get('/todos/1')
  .reply(200, {
    meep: 'moop'
  })

describe('/todo', () => {
  it('should return the intercepted value', async () => {
    const { status, statusText, headers, data: body } = await axios.get(BASE_URL + '/api/todo')

    expect(status).toEqual(200)
    expect(statusText).toEqual('OK')
    expect(headers['content-type']).toMatch(/json/)
    expect(body).toStrictEqual({
      meep: 'moop'
    })
  })
})

describe('/calc/add', () => {
  it('should return 5, because 2 + 3 = 5', async () => {
    const { status, statusText, headers, data: body } = await axios.get(BASE_URL + '/api/add')

    expect(status).toEqual(200)
    expect(statusText).toEqual('OK')
    expect(headers['content-type']).toMatch(/json/)
    expect(body).toStrictEqual({
      res: 5
    })
  })
})

describe('/calc/subtract', () => {
  it('shuld return 3, because 5 -2 = 3', async () => {
    const { status, statusText, headers, data: body } = await axios.get(BASE_URL + '/api/subtract')

    expect(status).toEqual(200)
    expect(statusText).toMatch('OK')
    expect(headers['content-type']).toMatch(/json/)
    expect(body).toStrictEqual({
      res: 3
    })
  })
})
