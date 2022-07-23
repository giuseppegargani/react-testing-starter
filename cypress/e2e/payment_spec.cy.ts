/* Dava di default le seguenti linee di codice:
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
}) */

/* CONCETTI:
  - MEGLIO INSTALLARE TESTING PLAYGROUND SU CHROME!!!
    https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano
  
  - MEGLIO ESEGUIRE IN ELECTRON IL TESTING!!!

  - SI PUO' USARE L'ESTENSIONE DI CHROME CHE SUGGERISCE QUERY

  - SE non prende l'Url Base si puo' anche inserire hardcoded!!!! come nel caso seguente!!!!

  - Ma le query in Cypress sono tutte find (e non get): FINDBYROLE!!!!

  - Lo screener di Cypress ha anche un Selettore (a forma di mirino in alto a sinistra!!)

*/
describe('payment', ()=>{
  it('user can make payment', ()=>{
    // login
    cy.visit('http://localhost:3000');
    cy.findByRole('textbox', { name: /username/i }).type('johndoe');
    cy.findByLabelText(/password/i).type('s3cret');
    cy.findByRole('checkbox', {name: /remember me/i}).check();
    cy.findByRole('button', {name: /sign in/i}).click(); 

    // check account balance
    let oldBalance
    cy.get('[data-test="sidenav-user-balance"]').then($balance => oldBalance = $balance.text()).then(balance => console.log(balance));

    // click on pay button
    // search for user
    // add amount and note and click pay 
  })
});