import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";


/* Concetti:
    screen.debug() per fare debug!!!
    Si deve creare un test per ogni componente e poi si puo' lanciare con "yarn test"!!
    Si possono tranquillare passare props dentro componenti che si richiamano per essere testati!!
    sender={{id: '5'}} receiver={{id: '5'}}
    
    - SI DEVE IMPORTARE ANCHE SCREEN!!!!! altrimenti non si puo' fare nemmeno debug!!!

    - DEBUG PERMETTE DI STAMPARE "In console" la struttura del DOM!!!
        screen.debug();

    - NEL CASO DI PROGRAMMAZIONE ASINCRONA E SI DEBBA ASPETTARE 
    si fa' wrapping con expect e await 
    test prende async davanti alla funzione arrow e poi
    expect(await screen.findByRole('button', {name: /pay/i}).toBeEnabled());

    - Prima bisogna cercare tutti i casi in cui si pensa che fallisca un test:
        prima dal Fallimento e poi risolverli!!!
        per esempio prima si passa da toBeEnabled (anche se si vede chiaramente che non funziona)
        e poi si usa to toBeDisabled()
        FINDBYROLE SI USA IN PROGRAMMAZIONE ASINCRONA!!!!
        Un esempio di programmazione asincrona si vede sotto!!!

    - Alcuni eventi:
        Esistere: const button = getByRole('button'); expect(button).toBeInTheDocument()
        screen.debug(); 

    - Priority!!!!!
        https://testing-library.com/docs/queries/about/
        Ci sono delle priorità nella ricerca di elementi per il testing!!!!!

    - UserEvent!!
        Per un controllo piu' avanzato sugli eventi invece di Fire!!!
        https://testing-library.com/docs/ecosystem-user-event/
        Si importa cosi:
        import userEvent from "@testing-library/user-event";

    - AAA Arrange, Act, Assert!!!
        Arrange prevede la renderizzazione del componente!!, Act prevede che vengano fatte cose
    
*/

test('On Initial Render, the pay button is disabled', async () =>{
    //Qui si renderizza un componente!!
    render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '5'}} />);

    expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled();
});

test('If an amount and note has been inserted, the button becomes enabled!!!', async () =>{
    //Qui si renderizza un componente!!
    render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '5'}} />);

    //expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
    userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

    //Adesso e' abilitato
    expect(await screen.findByRole('button', { name: /pay/i })).toBeEnabled();

});
