// console.log('This is funny, right?');
const expect = require('chai').expect;
const chai = require('chai');
const spies = require('chai-spies')
chai.use(spies);
const models = require('../models');
const db = models.db;
const Page = models.Page;
const User = models.User;

describe('Page model', function () {
  beforeEach((done)=>{
      Page.sync({ force: true }).then(()=>{
          done();
      })
  })
  let pageToPost;
  beforeEach(function(){
      pageToPost = Page.build({
          title: 'This Is A Title',
          urlTitle: 'This_Is_A_Title',
          content: 'This is some content.',
          status: "open",
          tags: ['blessed','nofilter']
      })
  });

  describe('Virtuals', function () {
      describe('route', function () {
          it('returns the url_name prepended by "/wiki/"', function() {
              expect(pageToPost.route).to.equal('/wiki/This_Is_A_Title');
          });
      });
      describe('renderedContent', function () {
          it('converts the markdown-formatted content into HTML', function(){
              expect(pageToPost.renderedContent).to.equal('<p>This is some content.</p>\n');
          });
      });
  });

  describe('Class methods', function () {
      describe('findByTag', function () {
          beforeEach(function(done) {
            Page.create({
              title: 'Josh',
              content: 'He is so AWESOME!',
              tags: ['josh', 'awesome']
            })
            .then(function () {
              done();
            })
            .catch(done);
          });
          it('gets pages with the search tag', function(done){
             Page.findByTag('awesome')
                .then(function (pages) {
                  console.log(pages)
                  expect(pages).to.have.lengthOf(1);
                  done();
                })
                .catch(done);
          });
          it('does not get pages without the search tag', function(done){

          });
      });
  });
});

//   describe('wikistack app', function(){
//     describe('page table', ()=> {
//       it('can create a new page', ()=>{
  
//       });
//       it('only accepts a string as title', () =>{
  
//       });
//       it("doesn't allow null entries", () =>{
  
//       });
//       it("tag has only array of strings", () =>{
  
//       });
//       it("getterMethods returns '/wiki/urlTitle' ", () =>{
  
//       });
//       it("it has classMethods findByTag", () =>{
  
//       });
//       it("it has instanceMethods findSimiliar", () =>{
  
//       });
//       it("it properly creates urlTitle", () =>{
  
//       });
//     })
//     describe('user table', () => {
//       it('can create a new user', () =>{
  
//       });
//       it('user.email is a valid email', () =>{
  
//       });
//       it('it does not allow null entry as name', () =>{
  
//       });
//       it('connects pages to users as author', () =>{
  
//       });
//     })
//   })
// })