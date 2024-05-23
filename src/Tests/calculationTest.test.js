import { calculateScore } from '../Utils/utils';

test('fewer errors higher than more errors', () => {
    expect(calculateScore(0, 1, 1, 3600000)).toBeGreaterThan(calculateScore(1, 26, 300, 1));
});

test('same errors, more unique characters higher than less unique characters', () => {
    expect(calculateScore(0, 2, 1, 3600000)).toBeGreaterThan(calculateScore(0, 1, 300, 1));
});

test('same errors, same unique characters, more length higher than less length', () => {
    expect(calculateScore(0, 1, 2, 3600000)).toBeGreaterThan(calculateScore(0, 1, 1, 1));
});

test('same errors, same unique characters, same length, shorter duration higher than longer duration', () => {
    expect(calculateScore(0, 1, 1, 1)).toBeGreaterThan(calculateScore(0, 1, 1, 10));
});