export interface TranslationResult {
  /**
   * Original text to translate.
   */
  originalText: string;

  /**
   * Main meaning of translation.
   */
  mainMeaning: string;

  /**
   * Phonetic transcription of target text.
   */
  tPronunciation: string;

  /**
   * Phonetic transcription of source text.
   */
  sPronunciation: string;

  /**
   * Detailed meanings of translation.
   */
  detailedMeanings: string[];

  /**
   * Definitions of translation.
   */
  definitions: {
    partOfSpeech: string;
    meaning: string;
  }[];

  /**
   * Examples of translation.
   */
  examples: {
    source: string;
    target: string;
  }[];
}

export interface Translator {
  /**
   * Translate text.
   * @param text Text to translate.
   * @param from Source language.
   * @param to Target language.
   * @returns Promise of translation result.
   */
  translate(text: string, from: string, to: string): Promise<TranslationResult>;

  /**
   * Detect language of text.
   * @param text Text to detect.
   * @returns Promise of detected language.
   */
  detect(text: string): Promise<string>;

  /**
   * Pronounce text.
   * @param text Text to pronounce.
   * @param language Language of text.
   * @param speed Pronunciation speed.
   * @returns Promise of pronunciation finished.
   */
  pronounce(text: string, language: string, speed: string): Promise<void>;

  /**
   * Stop pronunciation.
   */
  stopPronounce(): void;

  /**
   * Get supported languages.
   * @returns Set of supported languages.
   */
  supportedLanguages(): Set<string>;
}
