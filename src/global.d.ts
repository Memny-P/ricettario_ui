// per evitare l'errore: eslint-disable-next-line @typescript-eslint/no-used-vars
// TODO capire che cavolo sta succedendo qui..
import { StringSchema } from 'yup';

declare module 'yup' {
    class StringSchema {
        firstLetterUppercase(): this;
    }
}