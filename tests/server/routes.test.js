const home = require('../../controllers/home')
const image = require('../../controllers/image')
const routes = require('../../server/routes')
const configure = require('../../server/configure')
const supertest = require('supertest')

describe('Routes', function() {
  let app = {
    get: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy(),
    use: sinon.spy()
  };
  let request
  beforeEach(function() {
    request = supertest(routes)
  })
  // Create and write tests below
  //---------------------------------
  describe('GETs', function getTester() {
    it('should handle /', function() {
      request.get('/').expect(home.index)
    })
    it('should handle /images/:image_id', function() {
      request.get('/images/:image_id').expect(image.index)
    })
  })
  describe('POSTs', function postTester() {
    it('should handle /images', function() {
      request.get('/images').expect(image.create)
    });
    it('should handle /images/:image_id/like', function() {
      request.get('/images/:image_id/like').expect(image.like)
    });
    it('should handle /images/:image_id/comment', function() {
      request.get('/images/:image_id/comment').expect(image.comment)
    })
  })
  describe('DELETEs', function() {
    it('should handle /images/:image_id', function() {
      request.delete('/images/:image_id').expect(image.remove)
    })
  })
})
