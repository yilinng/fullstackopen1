describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Ann Miss',
      username: 'test12',
      password: 'test12',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  describe('when page opnen', function () {
    it('front page can be opened', () => {
      cy.contains('blogs')
    })

    it('user can login', function () {
      cy.get('#username').type('test12')
      cy.get('#password').type('test12')
      cy.get('#login-button').click()

      cy.contains('test12 logged in')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test12', password: 'test12' })
    })

    describe('add a blog', function () {
      it('message will show added success', function () {
        cy.contains('create new blog').click()

        const blogObject = {
          title: 'another blog cypress',
          author: 'Ann Miss',
          url: '123.124.com',
        }

        cy.get('.title_input').type(blogObject.title)
        cy.get('.author_input').type(blogObject.author)
        cy.get('.url_input').type(blogObject.url)
        cy.get('.createBtn').click()

        cy.get('.success').contains(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      })

      it('message will show added failed when title length is less then 3', function () {
        cy.contains('create new blog').click()

        const blogObject = {
          title: 'an',
          author: '11',
          url: '123.124.com',
        }

        cy.get('.title_input').type(blogObject.title)
        cy.get('.author_input').type(blogObject.author)
        cy.get('.url_input').type(blogObject.url)
        cy.get('.createBtn').click()

        //console.log('cy_error', cy.get('.error'))

        cy.get('.error').contains(
          'Blog validation failed: title: Path `title` (`an`) is shorter than the minimum allowed length (3).'
        )
      })
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'add new title',
          author: 'Ben Mush',
          url: 'qwe.qwe.com',
        })
      })

      it('it can be viewed', function () {
        console.log('cy', cy)
        cy.contains('add new title')

        cy.get('.blog').last().contains('view').click()

        cy.contains('Ben Mush')
      })

      it('it can be liked', function () {
        cy.get('.blog').last().get('.likeBtn').click({ force: true })

        cy.get('.blog').last().get('.likes_text').contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.get('.blog').last().get('.deleteBtn').click({ force: true })
      })
    })

    describe('blogs are ordered by likes ', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'Ben Mush',
          url: '123.qwe.com',
        })

        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'Ben Mush',
          url: 'qwe.qwe.com',
        })
      })

      it('with the most liked blog being first', function () {
        cy.get('.blog').eq(0).contains('view').click()

        cy.get('.blog')
          .eq(0)
          .get('.likeBtn')
          .click({ multiple: true, force: true })
        cy.get('.blog')
          .eq(0)
          .get('.likeBtn')
          .click({ multiple: true, force: true })
        cy.get('.blog').eq(0).contains('hide').click({ force: true })

        cy.get('.blog')
          .eq(1)
          .contains('view')
          .click({ multiple: true, force: true })
        cy.get('.blog')
          .eq(1)
          .get('.likeBtn')
          .click({ multiple: true, force: true })

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog')
          .eq(1)
          .should('contain', 'The title with the second most likes')
      })
    })

    describe('user can logout', function () {
      it('logout success', function () {
        cy.get('.logoutBtn').click()
        cy.contains('username')
        cy.contains('password')
      })
    })
  })
})
