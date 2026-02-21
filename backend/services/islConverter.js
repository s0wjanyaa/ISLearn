/**
 * ISL Grammar Converter Service
 * Uses phrase dataset for supported sentences. Returns ISL gloss + educational description.
 */

import { phrases } from '../data/islPhrases.js';

/**
 * Normalize input for lookup: lowercase, trim, collapse spaces, remove punctuation.
 */
function normalizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[.?!,]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Convert English text to ISL using the phrase dataset.
 * @param {string} text - Input English text
 * @returns {Promise<{ original, islGrammar, grammarDescription, gestureSequence }>}
 * @throws {Error} When text is empty or phrase is not supported
 */
export async function convertToISL(text) {
  const original = (text && text.trim()) || '';
  const normalized = normalizeInput(original);

  if (!normalized) {
    throw new Error('Empty text provided');
  }

  const phrase = phrases[normalized];

  if (!phrase) {
    const err = new Error('Sentence not supported yet.');
    err.code = 'PHRASE_NOT_SUPPORTED';
    throw err;
  }

  const islGrammar = phrase.isl.join(' ');
  const gestureSequence = phrase.isl;

  return {
    original,
    islGrammar,
    grammarDescription: phrase.grammar,
    gestureSequence,
  };
}
