const {
  publicController,
} = require('../../../dist/public/controllers/publicController')

describe('publicController', () => {
  describe('login function', () => {
    it('should return valid user response', async () => {
      const controller = publicController

      const req = {
        body: {
          username: 'usertest',
          password: 'password',
        },
        headers: {
          apikey:
            'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJja0JUQyIsIlVzZXJuYW1lIjoiY2tCVENBcGkiLCJleHAiOjE5MTY5NzM2NjMsImlhdCI6MTY5NjA0ODg2M30',
        },
        session: {},
      }

      const result = await controller.login(req)
      expect(result.result).toEqual('Valid User')
      expect(result.token).toEqual(expect.any(String))
      expect(result.refreshToken).toEqual(expect.any(String))
    })
  })
})
