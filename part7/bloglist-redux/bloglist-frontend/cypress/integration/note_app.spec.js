/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tim Gasovski',
      username: 'test',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.contains('login').click()
      cy.contains('Tim Gasovski')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongName')
      cy.get('#password').type('1')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.contains('login').click()
      cy.contains('Tim Gasovski')
    })

    it('A blog can be created and liked', function() {
      cy.contains('Add Blog').click()
        .get('#title').type('Title of my TEST blog')
        .get('#author').type('John Green Jr.')
        .get('#url').type('www.webiste.com/myblog')
      cy.contains('create').click()
      cy.contains('Title of my TEST blog John Green Jr.')
      //check if likes function works:
      cy.contains('view').click()
      cy.get('#likes')
        .contains('0')
      cy.get('#likesBtn').click()
      cy.get('#likes')
        .contains('1')
    })
    it('A blog can be deleted', function() {
      cy.contains('Add Blog').click()
        .get('#title').type('Should be deleted (TITLE)')
        .get('#author').type('John Johnson')
        .get('#url').type('www.webiste.com/myblog')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('Should be deleted (TITLE)')
      cy.get('#deleteBtn').click()
      cy.should('not.contain', 'Title of my TEST blog')
    })
    it('Blogs are sorted by the number of likes', function() {
      //create sample blogs:
      cy.contains('Add Blog').click()
        .get('#title').type('FIRST blog')
        .get('#author').type('John Johnson')
        .get('#url').type('www.webiste.com/myblog1')
      cy.contains('create').click()
      cy.contains('Add Blog').click()
        .get('#title').type('SECOND blog')
        .get('#author').type('Patrick Johnson')
        .get('#url').type('www.webiste.com/myblog2')
      cy.contains('create').click()
      cy.contains('Add Blog').click()
        .get('#title').type('THIRD blog')
        .get('#author').type('Rick Johnson')
        .get('#url').type('www.webiste.com/myblog3')
      cy.contains('create').click()
      cy.contains('Add Blog').click()
        .get('#title').type('FOURTH blog')
        .get('#author').type('Ben Johnson')
        .get('#url').type('www.webiste.com/myblog4')
      cy.contains('create').click()
      //add likes to them:
      cy.get('#FIRSTblog')
        .contains('view').click()
      cy.get('#FIRSTblog')
        .contains('like').click()
      cy.get('#SECONDblog')
        .contains('view').click()
      cy.get('#SECONDblog')
        .contains('like').click()
      cy.get('#THIRDblog')
        .contains('view').click()
      cy.get('#THIRDblog')
        .contains('like').click()
        .wait(1000)
        .contains('like').click()
        .wait(1000)
        .contains('like').click()
      cy.get('#FOURTHblog')
        .contains('view').click()
      //Check if listing is correct:
      cy.get('.blog:first').first().contains('FOURTH blog')
      cy.get('.blog:last').first().contains('THIRD blog')
    })
  })
})
