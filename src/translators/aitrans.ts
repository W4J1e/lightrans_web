import axios from './axios';
import type { TranslationResult } from './types';

class AITranslator {
  /**
   * API key for SiliconFlow.
   */
  private apiKey: string = import.meta.env.VITE_SILICONFLOW_API_KEY || '';

  /**
   * API endpoint for SiliconFlow.
   */
  private apiEndpoint: string = import.meta.env.VITE_SILICONFLOW_API_ENDPOINT || 'https://api.siliconflow.cn/v1/chat/completions';
  
  /**
   * Available translation models.
   */
  private availableModels: string[] = [
    'Qwen/Qwen3-8B',
    'tencent/Hunyuan-MT-7B',
    'THUDM/glm-4-9b-chat',
    'Qwen/Qwen2.5-7B-Instruct'
  ];
  
  /**
   * Current model to use.
   */
  private currentModel: string = 'Qwen/Qwen3-8B';

  /**
   * Detect language of given text.
   * 
   * @param text text to detect
   * 
   * @returns Promise of detected language
   */
  async detect(text: string): Promise<string> {
    // Simple heuristic to detect Chinese/English
    // Check if text contains Chinese characters
    if (/[\u4e00-\u9fa5]/.test(text)) {
      return 'zh-CN';
    } 
    // Check if text contains mostly English characters
    else if (/^[a-zA-Z0-9\s\p{Punctuation}]*$/u.test(text)) {
      return 'en';
    }
    // For other languages, return auto
    return 'auto';
  }

  /**
   * Translate text using AItrans with specified model.
   * 
   * @param text text to translate
   * @param from source language
   * @param to target language
   * 
   * @returns Promise of translation result
   */
  async translate(text: string, from: string, to: string): Promise<TranslationResult> {
    try {
      // Map our language codes to SiliconFlow's language codes if needed
      const sourceLang = from === 'auto' ? 'auto' : from;
      const targetLang = to;

      // Prepare the request payload
      const payload = {
        model: this.currentModel,
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following text from ${sourceLang} to ${targetLang}. Only return the translated text, no other content.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1024,
        // Disable thinking mode for Qwen/Qwen3-8B model
        enable_thinking: this.currentModel === 'Qwen/Qwen3-8B' ? false : undefined
      };

      // Send the request
      const response = await axios.post(this.apiEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      // Parse the response
      const translatedText = response.data.choices[0].message.content.trim();

      // Return the translation result
      return {
        originalText: text,
        mainMeaning: translatedText,
        tPronunciation: '',
        sPronunciation: '',
        detailedMeanings: [],
        definitions: [],
        examples: []
      };
    } catch (error) {
      console.error('AItrans translation error:', error);
      throw new Error('AItrans translation failed');
    }
  }

  /**
   * Pronounce text using AItrans.
   * 
   * @param _text text to pronounce
   * @param _language language of text
   * @param _speed pronunciation speed
   * 
   * @returns Promise of pronunciation finished
   */
  async pronounce(_text: string, _language: string, _speed: string): Promise<void> {
    // SiliconFlow API doesn't provide pronunciation, so we'll just resolve
    return Promise.resolve();
  }

  /**
   * Stop pronunciation.
   */
  stopPronounce(): void {
    // SiliconFlow API doesn't provide pronunciation, so this is a no-op
  }

  /**
   * Get supported languages.
   * 
   * @returns Set of supported languages
   */
  supportedLanguages(): Set<string> {
    // SiliconFlow supports many languages, but we'll return a basic set
    return new Set([
      'auto',
      'en',
      'zh-CN',
      'zh-TW',
      'fr',
      'es',
      'ru',
      'de',
      'ja',
      'ko',
      'pt',
      'it',
      'ar',
      'hi',
      'tr',
      'pl',
      'nl',
      'sv',
      'fi',
      'da',
      'no',
      'cs',
      'hu',
      'ro',
      'sk',
      'bg',
      'uk',
      'th',
      'vi',
      'id',
      'ms',
      'tl',
      'fa',
      'ur',
      'bn',
      'pa',
      'gu',
      'kn',
      'ml',
      'ta',
      'te',
      'mr',
      'ne',
      'my',
      'km',
      'lo',
      'si',
      'am',
      'sw',
      'yo',
      'zu',
      'xh',
      'af',
      'sq',
      'hy',
      'az',
      'be',
      'bs',
      'cy',
      'eo',
      'et',
      'eu',
      'gl',
      'ha',
      'haw',
      'he',
      'hr',
      'is',
      'ig',
      'iu',
      'ga',
      'ka',
      'kk',
      'ky',
      'la',
      'lv',
      'lt',
      'mk',
      'mg',
      'mi',
      'mn',
      'mt',
      'nb',
      'nn',
      'ny',
      'or',
      'ps',
      'qu',
      'sd',
      'sl',
      'so',
      'st',
      'su',
      'tg',
      'tk',
      'tt',
      'ug',
      'uz',
      'vi',
      'cy',
      'yi',
      'yo'
    ]);
  }
  
  /**
   * Get available models.
   * 
   * @returns Array of available models
   */
  getAvailableModels(): string[] {
    return [...this.availableModels];
  }
  
  /**
   * Set current model to use.
   * 
   * @param model model name
   * 
   * @returns boolean whether the model was set successfully
   */
  setCurrentModel(model: string): boolean {
    if (this.availableModels.includes(model)) {
      this.currentModel = model;
      return true;
    }
    return false;
  }
  
  /**
   * Get current model.
   * 
   * @returns current model name
   */
  getCurrentModel(): string {
    return this.currentModel;
  }
}

export default AITranslator;
