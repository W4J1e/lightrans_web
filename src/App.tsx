import { useState } from 'react';
import { AITranslator } from './translators';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('zh-CN');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [model, setModel] = useState('tencent/Hunyuan-MT-7B');
  
  // 处理模型变化，自动重新翻译
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    // 如果有输入文本，自动重新翻译
    if (inputText.trim()) {
      handleTranslate();
    }
  };
  // 互译模式默认开启，不再显示在页面上
  const isMutualTranslate = true;
  
  const translator = new AITranslator();
  const availableModels = translator.getAvailableModels();

  // 支持的语言列表
  const languages = [
    { code: 'auto', name: '自动检测' },
    { code: 'en', name: '英语' },
    { code: 'zh-CN', name: '中文' },
    { code: 'ja', name: '日语' },
    { code: 'ko', name: '韩语' },
    { code: 'fr', name: '法语' },
    { code: 'es', name: '西班牙语' },
    { code: 'de', name: '德语' },
    { code: 'ru', name: '俄语' },
  ];

  // 处理翻译
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    setError('');
    
    try {
      // 设置当前模型
      translator.setCurrentModel(model);
      
      // 检测语言
      let detectedLang = sourceLanguage;
      if (sourceLanguage === 'auto') {
        detectedLang = await translator.detect(inputText);
      }
      
      // 互译模式逻辑 - 仅在目标语言为中文或英文时生效
      let finalTargetLang = targetLanguage;
      if (isMutualTranslate && (targetLanguage === 'zh-CN' || targetLanguage === 'en')) {
        if (detectedLang === 'zh-CN') {
          finalTargetLang = 'en';
        } else if (detectedLang === 'en') {
          finalTargetLang = 'zh-CN';
        }
        // 如果检测到的语言不是中文或英文，保持用户选择的目标语言
      }
      
      // 执行翻译
      const result = await translator.translate(inputText, detectedLang, finalTargetLang);
      setOutputText(result.mainMeaning);
    } catch (err) {
      console.error('Translation error:', err);
      setError('翻译失败，请检查API密钥是否正确');
    } finally {
      setIsTranslating(false);
    }
  };

  // 交换语言
  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    
    // 交换文本
    setInputText(outputText);
    setOutputText(inputText);
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  // 清空输入
  const clearInput = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lightrans Web</h1>
        <p>轻量级网页翻译工具</p>
      </header>
      
      <main className="app-main">
        <div className="translation-container">
          {/* 顶部配置栏 */}
          <div className="top-bar">
            <div className="language-selector">
              <select 
                value={sourceLanguage} 
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button 
                className="swap-button" 
                onClick={swapLanguages}
                title="交换语言"
              >
                ↕
              </button>
              <select 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="model-selector">
              <select 
                value={model} 
                onChange={(e) => handleModelChange(e.target.value)}
                className="model-select"
              >
                {availableModels.map(m => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* 翻译内容区域 */}
          <div className="translation-content">
            {/* 输入部分 */}
            <div className="input-section">
              <h3>输入文本</h3>
              <div className="input-container">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入要翻译的文本..."
                  rows={8}
                />
                <div className="input-actions">
                  <button 
                    className="action-button" 
                    onClick={clearInput}
                    title="清空"
                  >
                    清空
                  </button>
                  <button 
                    className="translate-button" 
                    onClick={handleTranslate}
                    disabled={isTranslating}
                  >
                    {isTranslating ? '翻译中...' : '翻译'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 输出部分 */}
            <div className="output-section">
              <h3>翻译结果</h3>
              {error && <div className="error-message">{error}</div>}
              <div className="output-container">
                <p className="output-text">{outputText || '翻译结果将显示在这里'}</p>
                {outputText && (
                  <button 
                    className="action-button" 
                    onClick={copyToClipboard}
                    title="复制到剪贴板"
                  >
                    复制
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© 2026 <a href="https://github.com/W4J1e/lightran_web" target="_blank" rel="noopener noreferrer">Lightrans Web</a> | <a href="https://hin.cool" target="_blank" rel="noopener noreferrer">by w4j1e</a></p>
      </footer>
    </div>
  );
}

export default App;
