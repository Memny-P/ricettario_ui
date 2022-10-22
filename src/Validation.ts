import exp from 'constants';
import * as Yup from 'yup';

// Aggiungo validazioni custom
function configureValidation() {
    Yup.addMethod(Yup.string, 'firstLetterUppercase', function () {
        return this.test('first-letter-uppercase',
            'First letter must be uppercase',
            function (value) {
                // prova a validare solo se l'utente immette qualche valore, altrimenti il test sarà sempre vero
                if (value && value.length > 0) {
                    // valido la prima lettera
                    const firstLetter = value.substring(0, 1);
                    return firstLetter === firstLetter.toUpperCase();
                }
                return true;
            })
    })
}

export default configureValidation;