"use strict";
var expect = require('chai').expect;

var request = require('supertest');

var app = require("../server/server.js");


describe("File should exist", function(){
  it("Check that the file being test exists", function() {
  expect(app).to.not.be.undefined;
  });
});

describe( "API POST Test", function(){
  it("/ should get 200 code", function(done) {
    request(app)
      .post('/getAssignments')
      .send({'first': 'John', 'last': 'Doe'})
      .end(function(err, res){
      	if (err) console.log('error inside!!')//return checkStatusCode(res);
        // expect(res.body.message).to.eql("Hello, World!");
        console.log('body',res.body);
        console.log('cookie',res.cookie);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

