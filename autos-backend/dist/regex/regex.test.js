import { expect, test } from '@jest/globals';
import { REGEX_EMAIL, REGEX_LOWERCASE, REGEX_MIN_8, REGEX_NUMBER, REGEX_PASSWORD, REGEX_SPECIAL, REGEX_UPPERCASE } from './regex.js';
test('Special', () => {
    const matchResult = ("").match(REGEX_SPECIAL);
    expect((matchResult && matchResult[0])).toBe(null);
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
    expect(REGEX_PASSWORD.test("")).toBe(false);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("Hakan.89!")).toBe(true);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("Hakan.89<")).toBe(false);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("hallo")).toBe(false);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("hakan@test")).toBe(false);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("halloHallo%")).toBe(false);
});
test('Password', () => {
    expect(REGEX_PASSWORD.test("Hakan.8Hakan")).toBe(false);
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
    expect(REGEX_EMAIL.test("")).toBe(false);
});
test('Email', () => {
    expect(REGEX_EMAIL.test("h")).toBe(false);
});
test('Email', () => {
    expect(REGEX_EMAIL.test("hakan@test.de")).toBe(true);
});
test('Email', () => {
    expect(REGEX_EMAIL.test("hakantest.de")).toBe(false);
});
test('Email', () => {
    expect(REGEX_EMAIL.test("hakan@test.deeee")).toBe(false);
});
test('Email', () => {
    expect(REGEX_EMAIL.test("h@t.de")).toBe(true);
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
