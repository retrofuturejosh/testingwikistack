// console.log('This is funny, right?');

const expect = require('chai').expect;
const chai = require('chai');
const spies = require('chai-spies')
chai.use(spies);

describe('math', function(){
  it('can add two and two',function(done){
    expect(2+2).to.equal(4);
    done()
  });
});


describe('set timeout',function(){
  it('waits a proper amount of time', function(done){
    var start = new Date();
    setTimeout(function(){
      var endpoint = new Date()-start;
      expect(endpoint).to.be.closeTo(1000);
    },1000);
    done()
  });
});

describe('it can spy on the forEach function',function(){
  it('logCounter', function(done){
    var arr = [1,2,3];
    function thatDoesStg(val){
      console.log(val);
    }

    var logCounter = chai.spy(thatDoesStg);
    arr.forEach(logCounter);

    expect(logCounter).to.have.been.called.exactly(3);
    done();
  });
})
