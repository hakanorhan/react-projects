import { expect, test } from '@jest/globals';
const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/;
const REGEX_MIN_8 = /^(?=.*\d).{8,255}$/;
const REGEX_UPPERCASE = /[A-Z]/;
const REGEX_LOWERCASE = /[a-z]/;
const REGEX_NUMBER = /[0-9]/;
const REGEX_SPECIAL = /[#?!@$%^&*-]/;
const REGEX_NAMES = /^([a-zA-Z0-9_\s]+)$/;
test('Special', () => {
    const matchResult = ("").match(REGEX_SPECIAL);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Special', () => {
    const matchResult = ("Hakan89#").match(REGEX_SPECIAL);
    expect(matchResult && matchResult[0]).toBe("#");
});
test('Special', () => {
    const matchResult = ("Hakan89?§").match(REGEX_SPECIAL);
    expect(matchResult && matchResult[0]).toBe('?');
});
test('Special', () => {
    const matchResult = ("?").match(REGEX_SPECIAL);
    expect(matchResult && matchResult[0]).toBe("?");
});
test('Number', () => {
    const matchResult = ("Hakan89").match(REGEX_NUMBER);
    expect(matchResult && matchResult[0]).toBe("8");
});
test('Number', () => {
    const matchResult = ("Hak4an.").match(REGEX_NUMBER);
    expect(matchResult && matchResult[0]).toBe("4");
});
test('Number', () => {
    const matchResult = ("Hakan").match(REGEX_NUMBER);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Number', () => {
    const matchResult = ("").match(REGEX_NUMBER);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("Hakan.89!").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe("Hakan.89!");
});
test('Password', () => {
    const matchResult = ("Hakan.89<").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("hallo").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("hakan@test").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("halloHallo%").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Password', () => {
    const matchResult = ("Hakan.8Hakan").match(REGEX_PASSWORD);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Uppercase', () => {
    const matchResult = ("").match(REGEX_UPPERCASE);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Uppercase', () => {
    const matchResult = ("HaLlo").match(REGEX_UPPERCASE);
    expect(matchResult && matchResult[0]).toBe("H");
});
test('Uppercase', () => {
    const matchResult = ("hallo").match(REGEX_UPPERCASE);
    expect(matchResult && matchResult[2]).toBe(null);
});
test('Lowercase', () => {
    const matchResult = ("").match(REGEX_LOWERCASE);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Lowercase', () => {
    const matchResult = ("Hallo").match(REGEX_LOWERCASE);
    expect(matchResult && matchResult[0]).toBe("a");
});
test('Lowercase', () => {
    const matchResult = ("HALLo").match(REGEX_LOWERCASE);
    expect(matchResult && matchResult[0]).toBe("o");
});
test('Email', () => {
    const matchResult = ("").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Email', () => {
    const matchResult = ("h").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Email', () => {
    const matchResult = ("hakan@test.de").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe("hakan@test.de");
});
test('Email', () => {
    const matchResult = ("hakantest.de").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Email', () => {
    const matchResult = ("hakan@test.deeee").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Email', () => {
    const matchResult = ("h@t.de").match(REGEX_EMAIL);
    expect(matchResult && matchResult[0]).toBe("h@t.de");
});
test('Min 8', () => {
    const matchResult = ("1234567").match(REGEX_MIN_8);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Min 8', () => {
    const matchResult = ("").match(REGEX_MIN_8);
    expect(matchResult && matchResult[0]).toBe(null);
});
test('Min 8', () => {
    const matchResult = ("12345678").match(REGEX_MIN_8);
    expect(matchResult && matchResult[0]).toBe("12345678");
});
test('Min 8', () => {
    const matchResult = ("123456789").match(REGEX_MIN_8);
    expect(matchResult && matchResult[0]).toBe("123456789");
});
