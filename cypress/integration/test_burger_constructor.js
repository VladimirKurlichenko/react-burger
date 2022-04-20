describe('drag ingredients and order the burger', function () {
  before(function () {
    cy.visit('http://localhost:3000/');
  });

  it('drag n drop the bun in the cart', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[data-cy="60d3b41abdacab0026a733c7"]').trigger("dragstart", {
      dataTransfer,
      force: true
    })

    cy.get('[data-cy="burger-constructor-bun-top"]').trigger("drop", {
      dataTransfer,
      force: true
    });
  });

  it('drag n drop the ingredient in the cart', function () {
    const dataTransfer = new DataTransfer();
    cy.get('[data-cy="60d3b41abdacab0026a733cc"]').trigger("dragstart", {
      dataTransfer,
      force: true
    })

    cy.get('[data-cy=burger-constructor-middle]').trigger("drop", {
      dataTransfer,
      force: true
    });
  });

  it('click the ingredient to open the modal', function () {
    cy.get('[data-cy="60d3b41abdacab0026a733cc"]').click({ force: true })
  });

  it('click to close the modal window', function () {
    cy.wait(1000)
    cy.get('[data-cy=modal-close]', {timeout: 20000}).click({ force: true })
  });

  it('click the order button', function () {
    cy.get('[data-cy="send-order"] > button').should('be.enabled').should('contain.text', 'Оформить заказ');

    cy.get('[data-cy="send-order"] > button').click('center');
  });

  it('get redirected to the login page', function () {
    cy.contains('Вход')
  })

  it('enter login credentials', function () {
    cy.get('form').find('input[name=email]').type('vovakurlichenko@gmail.com', { force: true })
    cy.get('form').find('input[name=password]').type('qwertyu', { force: true })
  });

  it('click the login button', function () {
    cy.get('[data-cy="buttonInput"] > button').click('center');
  });

  it('click the order button after login', function () {
    cy.wait(2000)
    cy.get('[data-cy="send-order"] > button').click('center');
  });

  it('click to close modal window (10 secs wait from a server)', function () {
    cy.wait(18000)
    cy.get('[data-cy=modal-close]').click({ force: true })
  });

}); 