import Swal from 'sweetalert2';
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
    });

    // Yup.addMethod(Yup.number, 'selectedIdIngredientBase', function () {
    //     return this.test('selected-id-ingredient-base',
    //         'Select a generic ingredient',
    //         function (value) {
    //             // prova a validare solo se l'utente immette qualche valore, altrimenti il test sarà sempre vero
    //             if (value && value > 0) return true;

    //             Swal.fire({
    //                 title: 'Error',
    //                 text: 'You need to choose a Generic ingredient',
    //                 icon: 'error'
    //             });
    //             return false;
    //         })
    // });
}

export default configureValidation;