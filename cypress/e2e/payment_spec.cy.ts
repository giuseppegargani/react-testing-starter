//const { cy } = require("date-fns/locale");
const {v4: uuidv4 } = require('uuid');

/* Dava di default le seguenti linee di codice:
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
}) */

/* CONCETTI:

  - IMPORTARE CY:
      const { cy } = require("date-fns/locale");

  - MEGLIO INSTALLARE TESTING PLAYGROUND SU CHROME!!!
    https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano
  
  - MEGLIO ESEGUIRE IN ELECTRON IL TESTING!!!

  - SI PUO' USARE L'ESTENSIONE DI CHROME CHE SUGGERISCE QUERY

  - SE non prende l'Url Base si puo' anche inserire hardcoded!!!! come nel caso seguente!!!!

  - Ma le query in Cypress sono tutte find (e non get): FINDBYROLE!!!!

  - Lo screener di Cypress ha anche un Selettore (a forma di mirino in alto a sinistra!!)

  - CONSOLE.LOG (se si cambia a Chrome si puo' vedere console)

  - SCROLLINTOVIEW() di solito funziona ma non questa volta perche' ci vuole tempo per caricare!!!

  - FORCE:TRUE per cliccare su un elemento anche se coperto da un altro!!!!

  - RUNKIT: (per sperimentare Moduli Node direttamente nel browser)
    https://www.youtube.com/watch?v=nzpTiZi1nlg
    https://npm.runkit.com/dotnetify

  - WEBDRIVER.IO: 
    https://www.youtube.com/watch?v=oIXy05lagto

  - COMPONENT PLAYGROUND (per componenti React):
    https://www.npmjs.com/package/component-playground
    https://npm.runkit.com/playground

  - CYPRESS: 
    https://docs.cypress.io/guides/component-testing/events-react#Testing-Events
    primo test con cypress:
    https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#Add-a-test-file
    - VISIT(): https://docs.cypress.io/api/commands/visit#Options
    - BEST PRATICES: https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl
    - CY is not defined: https://stackoverflow.com/questions/58982852/eslint-cy-is-not-defined-cypress
    - Intellisense not working: https://stackoverflow.com/questions/52434223/lost-intellisense-for-cypress-in-visual-studio-code
        https://github.com/vuejs/vue-cli/issues/4239
    
  - DEBUG VSCODE: https://code.visualstudio.com/docs/editor/debugging

  - TESTING RECIPES (DI REACT):
    https://it.reactjs.org/docs/testing-recipes.html

*/

/* REACT TESTING LIBRARY:
    Guida: https://blog.theodo.com/2021/12/react-testing-library-guide/
    Documentazione ufficiale: https://testing-library.com/docs/recipes
    - Integrare JEST with ESLINT: https://dev.to/yvad60/setup-jest-and-react-testing-library-in-a-react-project-a-step-by-step-guide-1mf0
    - FreeCodeCamp: https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/
    LINKS: https://www.google.com/search?q=react+testing+library&tbm=isch&ved=2ahUKEwia1tmn-Jv5AhUP3RoKHUoCBugQ2-cCegQIABAA&oq=react+testing+library&gs_lcp=CgNpbWcQAzIECAAQEzIECAAQEzIECAAQEzIECAAQEzIECAAQEzIICAAQHhAIEBM6BAgjECc6BAgAEB46BAgAEBg6BAgAEEM6CwgAEIAEELEDEIMBOgUIABCABDoICAAQgAQQsQM6BwgAELEDEEM6BAgAEAM6CAgAEB4QBRATOgYIABAeEAU6BggAEB4QCDoGCAAQHhATUI0PWMAsYJoyaABwAHgAgAHeAYgBlg2SAQYyMS4wLjGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=t7DiYtqeCI-6a8qEmMAO&bih=664&biw=1536&rlz=1C1RXQR_itIT975IT975
    - Tutorial: https://www.robinwieruch.de/react-testing-library/

*/

/* SERIE DI TUTORIAL SU REACT TESTING E REACT!!!!!!!!!!!!!
    https://www.youtube.com/c/TechbaseDev/videos

*/


describe('payment', ()=>{
  it('user can make payment', ()=>{
    // login
    cy.visit('http://localhost:3000');
    //cy.visit('/');
    cy.findByRole('textbox', { name: /username/i }).type('johndoe');
    cy.findByLabelText(/password/i).type('s3cret');
    cy.findByRole('checkbox', {name: /remember me/i}).check();
    cy.findByRole('button', {name: /sign in/i}).click(); 

    // check account balance
    let oldBalance
    cy.get('[data-test="sidenav-user-balance"]').then($balance => oldBalance = $balance.text()).then(balance => console.log(balance));

    // click on new button
    cy.findByRole('button', {name: /new/i}).click();

    // search for user
    cy.findByRole('textbox').type('devon becker');
    cy.findByText(/devon becker/i).click(); 

    const paymentAmount = "5.00";
    // add amount and note and click pay 
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);

    //una specie di Random!!!numero uuid4!!!!
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole('button', {name: /pay/i}).click();

    //return to transactions
    cy.findByRole('button', {name: /return to transactions/i}).click();

    //Go to personal payments
    cy.findByRole('tab', {name: /mine/i}).click();

    //Click on payment
    cy.findByText(note).click({force: true});

    //verificare che sia stato fatto il pagamento
    cy.findByText(`-$${paymentAmount}`).should('be.visible');
    cy.findByText(note).should('be.visible');
    
    //verifiy if the payment has been deducted
     // verify if payment amount was deducted
     cy.get('[data-test=sidenav-user-balance]').then($balance => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
  });
  });
});