import { expect, test} from '@jest/globals';
import { REGEX_EMAIL, REGEX_HUBRAUM, REGEX_MIN_8, REGEX_MODEL, REGEX_NAMES, REGEX_PASSWORD, REGEX_PRICE, REGEX_STREET, REGEX_STREET_NR } from '../regex/regex';

const VALID_EMAILS = [
    "h@w.de",
    "hallo@w.de",
    "hello@ab.de",
    "abc@test-hallo.der",
    "h@w.de",
    "h@w.de",
    "nch@w.derr",
    "___h@w.derww",
    "h@w.derww",
    "hal~lo@test.de",
    "34567890123456789012345678901234567890123456789012345678901234+x@example.com",
    "Hallo@test.de"
];

const INVALID_EMAILS = [
    "ha@he@test.de",
    "h",
    "##∆@de,lm",
    "email@example..com",
    "Abc..123@example.com",
    "hallo@test.d"
    
];

    //https://en.wikipedia.org/wiki/Email_address#Valid_email_addresses
    VALID_EMAILS.push("user%example.com@example.org");
    VALID_EMAILS.push("\"john..doe\"@example.org");

    INVALID_EMAILS.push("abc.example.com");
    INVALID_EMAILS.push("a\"b(c)d,e:f;g<h>i[j\k]l@example.com");
    INVALID_EMAILS.push("this is\"not\allowed@example.com");
    INVALID_EMAILS.push("this\ still\"not\\allowed@example.com");
    INVALID_EMAILS.push("1234567890123456789012345678901234567890123456789012345678901234+x@example.com");

const VALID_PASSWORD = [
    "Thomas.80!",
    "-Maxüq2.52"
];

const INVALID_PASSWORD = [
    "",
    "abc",
    "55596512545",
    "Thomas.40",
    "h@w.de"
];

const VALID_MIN8 = [
    "12345678",
    "123456789"
];

const INVALID_MIN8 = [
    "1234567",
    ""
];

const VALID_NAMES = [
    "Max",
    "Maxim Muster",
    "Max-O'Brien",
    "MAxim"
];

const INVALID_NAMES = [
    ""
];

const VALID_HUBRAUM = [
    "19595",
    "3965",
    "4"
];

const INVALID_HUBRAUM = [
    "192535",
    "",
    "3965a"


];

const VALID_PRICE = [
    "19595",
    "4",
    "3965",
    "999999999"
];

const INVALID_PRICE = [
    "1192535656",
    "",
    "3965a",
    "1000000000"
];

const VALID_STREET = [
    "Musterstr",
    "Musterstraße",
    "Muster Straße",
    "Müsterstraße",
    "ab"
];

const INVALID_STREET = [
    "",
    "A",
    "a",
    "?",
    "2"
];

const VALID_STREET_NR = [
    "22A",
    "22a",
    "22"
];

const INVALID_STREET_NR = [
    "22Ab",
    "22ab",
    "",
    "b12",
    "Musterstr."
];

const VALID_MODEL = [
    "Bahnhof",
    "BA",
    "Ba",
    "BahnhofBahnhofBahnho",
    "Bahnhof A",
    "22",
    "22ab",
    "b12"
];

const INVALID_MODEL = [
    "",
    "Musterstr.",
    "BahnhofBahnhofBahnhof",
    "Bahnhöf"
];

test('email-regex', () => {

    VALID_EMAILS.forEach(element => {
        expect(REGEX_EMAIL.test(element)).toBe(true);    
    });

    INVALID_EMAILS.forEach(element => {
        expect(REGEX_EMAIL.test(element)).toBe(false);
    });
})

test('password-regex', () => {
    VALID_PASSWORD.forEach(element => {
        expect(REGEX_PASSWORD.test(element)).toBe(true);
    });

    INVALID_PASSWORD.forEach(element => {
        expect(REGEX_PASSWORD.test(element)).toBe(false);
    });

})

test('min8-regex', () => {
    VALID_MIN8.forEach(element => {
        expect(REGEX_MIN_8.test(element)).toBe(true);
    });

    INVALID_MIN8.forEach(element => {
        expect(REGEX_MIN_8.test(element)).toBe(false);
    });

})

test('names-regex', () => {
    VALID_NAMES.forEach(element => {
        expect(REGEX_NAMES.test(element)).toBe(true);
    });

    INVALID_NAMES.forEach(element => {
        expect(REGEX_NAMES.test(element)).toBe(false);
    });

})

test('hubraum-regex', () => {
    VALID_HUBRAUM.forEach(element => {
        expect(REGEX_HUBRAUM.test(element)).toBe(true);
    });

    INVALID_HUBRAUM.forEach(element => {
        expect(REGEX_HUBRAUM.test(element)).toBe(false);
    });

})

test('price-regex', () => {
    VALID_PRICE.forEach(element => {
        expect(REGEX_PRICE.test(element)).toBe(true);
    });

    INVALID_PRICE.forEach(element => {
        expect(REGEX_PRICE.test(element)).toBe(false);
    });

})

test('street-regex', () => {
    VALID_STREET.forEach(element => {
        expect(REGEX_STREET.test(element)).toBe(true);
    });

    INVALID_STREET.forEach(element => {
        expect(REGEX_STREET.test(element)).toBe(false);
    });

})

test('streetnr-regex', () => {
    VALID_STREET_NR.forEach(element => {
        expect(REGEX_STREET_NR.test(element)).toBe(true);
    });

    INVALID_STREET_NR.forEach(element => {
        expect(REGEX_STREET_NR.test(element)).toBe(false);
    });

})

test('model-regex', () => {
    VALID_MODEL.forEach(element => {
        expect(REGEX_MODEL.test(element)).toBe(true);
    });

    INVALID_MODEL.forEach(element => {
        expect(REGEX_MODEL.test(element)).toBe(false);
    });

})