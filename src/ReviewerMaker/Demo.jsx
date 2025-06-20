import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Brain, BookOpen, Key, Download, Trash2, Eye, ChevronLeft } from 'lucide-react';

const Demo = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'extract', 'saved'
  const [selectedMode, setSelectedMode] = useState('normal');
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [savedExtractions, setSavedExtractions] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [currentExtraction, setCurrentExtraction] = useState(null);
    const [hoveredStep, setHoveredStep] = useState(null);
  const fileInputRef = useRef(null);

  const extractionModes = {
    normal: {
      title: 'Normal Extraction',
      description: 'Extract complete definitions from text',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-teal-500'
    },
    sentence: {
      title: 'One Sentence',
      description: 'Get concise single-sentence definitions',
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    keywords: {
      title: 'Keywords Only',
      description: 'Create reviewer notes with just key terms and phrases',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  };

  const steps = [
    { text: 'Choose an extraction mode above', icon: '🎯' },
    { text: 'Enter your text or upload a document', icon: '📝' },
    { text: 'Click "Extract" to analyze (API key needed here if not saved)', icon: '🔑' },
    { text: 'View the extracted terms and meanings', icon: '👀' },
    { text: 'Results are saved automatically', icon: '💾' }
  ];

  const styles = {stepsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },

    stepItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      boxShadow: '0 0 0 2px #000, 2px 2px 0 2px #000',
      border: 'none',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      cursor: 'pointer',
      position: 'relative'
    },
sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
      marginTop: '20px'
    },

      sectionIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: '#f97316',
      boxShadow: '0 0 0 2px #000, 2px 2px 0 2px #000',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },

    sectionTitle: {
      fontSize: '18px',
      color: '#000',
      fontFamily: '"Press Start 2P", monospace'
    },

    stepNumber: {
      width: '32px',
      height: '32px',
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 0 0 2px #000, 2px 2px 0 2px #000',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },

    stepContent: {
      flex: 1
    },

    stepIconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px'
    },

    stepIcon: {
      fontSize: '18px',
      transition: 'transform 0.3s ease'
    },

    stepText: {
      color: '#374151',
      fontSize: '12px',
      lineHeight: '1.6'
    },

    stepIndicator: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '8px',
      height: '8px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
    },
  }
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Real Gemini API integration
  const performExtraction = async () => {
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }

    if (!inputText.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setIsExtracting(true);

    try {
      // Prepare prompts based on extraction mode
      let prompt = '';
      
      switch (selectedMode) {
        case 'normal':
          prompt = `Analyze the following text and extract key terms with their complete definitions. Format the output as:

**Key Terms and Definitions:**

• **Term**: Definition explaining what the term means in detail.

Only extract terms that are actually mentioned or discussed in the text. Here is the text to analyze:

${inputText}`;
          break;
          
        case 'sentence':
          prompt = `Analyze the following text and extract key terms with concise one-sentence definitions. Format the output as:

**Concise Definitions:**

• **Term**: Single sentence definition.

Only extract terms that are actually mentioned or discussed in the text. Keep definitions brief and clear. Here is the text to analyze:

${inputText}`;
          break;
          
        case 'keywords':
          prompt = `Analyze the following text and extract only the most important keywords and key phrases. Format the output as:

**Key Terms:**

• Term1 • Term2 • Term3 • Term4
• Term5 • Term6 • Term7 • Term8

Group related terms together and only include terms that are actually mentioned or relevant to the text content. Here is the text to analyze:

${inputText}`;
          break;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('No content generated from API');
      }

      const extractedContent = data.candidates[0].content.parts[0].text;
      const timestamp = new Date().toLocaleString();

      const extraction = {
        id: Date.now(),
        mode: selectedMode,
        title: `${extractionModes[selectedMode].title} - ${timestamp}`,
        content: extractedContent,
        originalText: inputText.substring(0, 100) + (inputText.length > 100 ? '...' : ''),
        timestamp,
        wordCount: inputText.split(' ').length
      };

      setSavedExtractions(prev => [extraction, ...prev]);
      setCurrentExtraction(extraction);
      
    } catch (error) {
      console.error('Extraction error:', error);
      alert(`Error during extraction: ${error.message}. Please check your API key and try again.`);
    } finally {
      setIsExtracting(false);
    }
  };

  const deleteExtraction = (id) => {
    setSavedExtractions(prev => prev.filter(item => item.id !== id));
  };

  const exportExtraction = (extraction) => {
    const element = document.createElement('a');
    const file = new Blob([extraction.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${extraction.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const ApiKeyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mt-10">
      <div className="pixel-window bg-gray-100 max-w-md w-full p-8">
        <div className="pixel-title-bar bg-blue-600 text-white p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="pixel-icon bg-yellow-400 w-5 h-5"></div>
            <span className="pixel-font-heading text-sm">API KEY REQUIRED</span>
          </div>
          <button 
            onClick={() => setShowApiModal(false)} 
            className="pixel-button-sm bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center"
          >
            <span className="pixel-font-heading text-sm">×</span>
          </button>
        </div>
        
        <p className="pixel-font-body text-gray-800 mb-6 leading-relaxed">
          Please enter your Google AI Gemini API key to use the extraction features.
        </p>
        
        <input
          type="password"
          placeholder="Enter your Gemini API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="pixel-input w-full p-4 mb-6 bg-white border-2 border-gray-400 focus:border-blue-500"
        />
        
        <button
          onClick={() => {
            if (apiKey.trim()) {
              setShowApiModal(false);
              performExtraction();
            }
          }}
          disabled={!apiKey.trim()}
          className="pixel-button w-full bg-green-500 hover:bg-green-600 text-white py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="pixel-font-heading">SAVE AND CONTINUE</span>
        </button>
        
        <div className="pixel-info-box bg-yellow-100 border-2 border-yellow-400 p-4 mt-6">
          <p className="pixel-font-heading text-xs text-yellow-800 mb-3">HOW TO GET YOUR API KEY:</p>
          <div className="pixel-font-body text-sm text-yellow-700 space-y-2 leading-relaxed">
            <div>1. Go to Google AI Studio</div>
            <div>2. Sign in with your Google account</div>
            <div>3. Click "Get API key" in the top right</div>
            <div>4. Create a key for a new project</div>
            <div>5. Copy the generated API key</div>
            <div>6. Paste it into the input field above</div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-6xl h- mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 h-38">
          <div className="pixel-header bg-teal-600 text-white p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="pixel-icon-large bg-orange-500 w-12 h-12 mx-auto mb-4"></div>
            <h1 className="pixel-font-heading text-3xl mb-4">REVIEWER MAKER</h1>
            <p className="pixel-font-body text-lg leading-relaxed">Create organized notes from your text with AI-powered analysis</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button
            onClick={() => setCurrentView('extract')}
            className="pixel-button bg-teal-500 hover:bg-teal-600 text-white p-8 flex items-center justify-center gap-4 transform hover:scale-105 transition-all duration-200"
          >
            <FileText className="w-10 h-11 mb-13" />
            <span className="pixel-font-heading text-1xl">EXTRACT NEW</span>
          </button>
          <button
            onClick={() => setCurrentView('saved')}
            className="pixel-button bg-gray-600 hover:bg-gray-700 text-white p-8 flex items-center justify-center gap-4 transform hover:scale-105 transition-all duration-200"
          >
            <BookOpen className="w-10 h-10" />
            <span className="pixel-font-heading text-1xl">SAVED RESULTS ({savedExtractions.length})</span>
          </button>
        </div>

        {/* Extraction Mode Selection */}
        <div className="pixel-window bg-gray-100 p-8 mb-8 ">
          <div className="pixel-title-bar bg-orange-500 text-white p-4 mb-6 flex items-center gap-3">
            <div className="pixel-icon bg-yellow-400 w-5 h-5"></div>
            <span className="pixel-font-heading text-lg">CHOOSE EXTRACTION MODE</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(extractionModes).map(([key, mode]) => (
              <div
                key={key}
                className={`pixel-card cursor-pointer transition-all duration-300 transform hover:scale-105 p-6 ${
                  selectedMode === key
                    ? 'pixel-card-selected bg-blue-100 border-blue-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMode(key)}
              >
                <div className={`pixel-icon-box ${mode.color} w-16 h-16 flex items-center justify-center text-white mb-4 mx-auto`}>
                  {mode.icon}
                </div>
                <h3 className="pixel-font-heading text-center mb-3 text-sm">{mode.title.toUpperCase()}</h3>
                <p className="pixel-font-body text-sm text-gray-600 text-center leading-relaxed">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        {/* <div className="pixel-window bg-gray-100 p-8">
          <div className="pixel-title-bar bg-yellow-500 text-white p-4 mb-6 flex items-center gap-3">
            <div className="pixel-icon bg-blue-400 w-5 h-5"></div>
            <span className="pixel-font-heading text-lg">HOW IT WORKS</span>
          </div>

          <div className="space-y-4">
            {[
              "Choose an extraction mode above",
              "Enter your text or upload a document", 
              "Click 'Extract' to analyze (API key needed if not saved)",
              "View the extracted terms and meanings",
              "Results are saved automatically"
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4 pixel-step hover:bg-blue-50 p-4 transition-colors duration-200">
                <div className="pixel-step-number bg-blue-500 text-white w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="pixel-font-heading text-sm">{index + 1}</span>
                </div>
                <p className="pixel-font-body leading-relaxed">{step}</p>
              </div>
            ))}
          </div> */}
           <div style={styles.contentCard} className="card-hover">
                <div style={styles.sectionHeader}>
                  <div style={{...styles.sectionIcon, backgroundColor: '#eab308'}} className="section-icon-hover">
                    ❓
                  </div>
                  <h3 style={styles.sectionTitle}>How it works</h3>
                </div>

                <div style={styles.stepsList}>
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      style={{
                        ...styles.stepItem,
                        backgroundColor: hoveredStep === index ? '#dbeafe' : '#f9fafb',
                        transform: hoveredStep === index ? 'scale(1.05)' : 'scale(1)'
                      }}
                      className="step-hover"
                    >
                      <div style={{
                        ...styles.stepNumber,
                        backgroundColor: hoveredStep === index ? '#2563eb' : '#3b82f6',
                        transform: hoveredStep === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                      className="step-number">
                        {index + 1}
                      </div>
                      <div style={styles.stepContent}>
                        <div style={styles.stepIconContainer}>
                          <span style={{
                            ...styles.stepIcon,
                            transform: hoveredStep === index ? 'scale(1.25)' : 'scale(1)'
                          }}
                          className="step-icon">{step.icon}</span>
                        </div>
                        <p style={styles.stepText}>{step.text}</p>
                      </div>
                      
                      {hoveredStep === index && (
                        <div style={styles.stepIndicator}></div>
                      )}
                    </div>
                  ))}
                </div>

          {/* Start Extraction Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentView('extract')}
              className="pixel-button-large bg-green-500 hover:bg-green-600 text-white px-12 py-6 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="pixel-font-heading text-xl">⚡ START EXTRACTION</span>
            </button>
          </div>
        </div>

        {/* Pixel decoration */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`w-4 h-4 ${i % 3 === 0 ? 'bg-orange-400' : i % 3 === 1 ? 'bg-teal-400' : 'bg-yellow-400'} pixel-decoration animate-pulse`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ExtractView = () => (
    <div class="min-h-screen grid place-items-center mt-50">
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => setCurrentView('home')}
        className="pixel-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 flex items-center gap-3 mb-8 mt-10"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="pixel-font-heading">BACK TO HOME</span>
      </button>

      <div className="pixel-window bg-gray-100 p-8 mb-8">
        <div className="pixel-title-bar bg-blue-600 text-white p-4 mb-6">
          <span className="pixel-font-heading text-lg">ENTER TEXT TO ANALYZE</span>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="pixel-button-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span className="pixel-font-heading text-xs">UPLOAD</span>
          </button>
          <button
            onClick={() => setInputText('')}
            className="pixel-button-sm bg-red-500 hover:bg-red-600 text-white px-4 py-3 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            <span className="pixel-font-heading text-xs">CLEAR</span>
          </button>
          <div className="ml-auto pixel-info bg-gray-200 px-4 py-3">
            <span className="pixel-font-body text-sm">{inputText.length} characters</span>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here or upload a document..."
          className="pixel-textarea w-[700px] h-[450px] p-6 bg-white border-2 border-gray-400 focus:border-blue-500 resize-none"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 ${extractionModes[selectedMode].color} pixel-icon`}></div>
            <span className="pixel-font-heading text-sm">MODE: {extractionModes[selectedMode].title.toUpperCase()}</span>
          </div>
          <button
            onClick={performExtraction}
            disabled={isExtracting || !inputText.trim()}
            className="pixel-button bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isExtracting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="pixel-font-heading">EXTRACTING...</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span className="pixel-font-heading">EXTRACT TERMS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {currentExtraction && (
        <div className="pixel-window bg-gray-100 p-8">
          <div className="pixel-title-bar bg-green-600 text-white p-4 mb-6 flex justify-between items-center">
            <span className="pixel-font-heading text-lg">EXTRACTION RESULTS</span>
            <button
              onClick={() => exportExtraction(currentExtraction)}
              className="pixel-button-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="pixel-font-heading text-xs">EXPORT</span>
            </button>
          </div>
          <div className="pixel-content bg-white p-6 border-2 border-gray-300">
            <pre className="pixel-font-body whitespace-pre-wrap leading-relaxed">
              {currentExtraction.content}
            </pre>
          </div>
        </div>
      )}
    </div>
    </div>
  );

  const SavedView = () => (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrentView('home')}
          className="pixel-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 flex items-center gap-3"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="pixel-font-heading">BACK</span>
        </button>
        <h2 className="pixel-font-heading text-2xl">SAVED EXTRACTIONS</h2>
        <div></div>
      </div>

      <div className="pixel-window bg-gray-100 p-8">
        <div className="pixel-title-bar bg-purple-600 text-white p-4 mb-8 flex items-center gap-3">
          <BookOpen className="w-5 h-5" />
          <span className="pixel-font-heading text-lg">YOUR SAVED EXTRACTIONS</span>
        </div>

        {savedExtractions.length === 0 ? (
          <div className="text-center py-16">
            <div className="pixel-icon-large bg-gray-300 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FileText className="w-10 h-10 text-gray-600" />
            </div>
            <p className="pixel-font-body text-gray-600 mb-8 text-lg leading-relaxed">No saved extractions found.</p>
            <button
              onClick={() => setCurrentView('extract')}
              className="pixel-button bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 transform hover:scale-105 transition-all duration-200"
            >
              <span className="pixel-font-heading">CREATE FIRST EXTRACTION</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedExtractions.map((extraction) => (
              <div key={extraction.id} className="pixel-card bg-white p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="pixel-font-heading text-sm mb-2">{extraction.title.toUpperCase()}</h4>
                    <p className="pixel-font-body text-sm text-gray-600 leading-relaxed">
                      {extraction.wordCount} words • {extraction.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setCurrentExtraction(extraction);
                        setCurrentView('extract');
                      }}
                      className="pixel-button-sm bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => exportExtraction(extraction)}
                      className="pixel-button-sm bg-green-500 hover:bg-green-600 text-white w-10 h-10 flex items-center justify-center"
                      title="Export"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteExtraction(extraction.id)}
                      className="pixel-button-sm bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="pixel-font-body text-sm text-gray-700 mb-4 leading-relaxed">{extraction.originalText}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${extractionModes[extraction.mode].color} pixel-icon`}></div>
                  <span className="pixel-font-body text-sm text-gray-500">{extractionModes[extraction.mode].title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pixel-bg">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Courier+Prime:wght@400;700&display=swap');
        
        .pixel-bg {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          image-rendering: pixelated;
        }
        
        .pixel-font-heading {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
          line-height: 1.6;
          letter-spacing: 0.05em;
        
        }
        
        .pixel-font-body {
          font-family: 'Courier Prime', monospace;
          image-rendering: pixelated;
          line-height: 1.7;
          font-weight: 400;
        }
        
        .pixel-window {
          border: 3px solid #333;
          border-radius: 0;
          box-shadow: 6px 6px 0px rgba(0,0,0,0.3);
          image-rendering: pixelated;
          margin-top:30px;
        }
        
        .pixel-title-bar {
          border: none;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-button {
          border: 3px solid #333;
          border-radius: 0;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.3);
          image-rendering: pixelated;
          transition: all 0.2s ease;
        }
        
        .pixel-button:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
        }
        
        .pixel-button-sm {
          border: 2px solid #333;
          border-radius: 0;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
          image-rendering: pixelated;
          transition: all 0.2s ease;
        }
        
        .pixel-button-sm:hover {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px rgba(0,0,0,0.3);
        }
        
        .pixel-button-large {
          border: 4px solid #333;
          border-radius: 0;
          box-shadow: 6px 6px 0px rgba(0,0,0,0.4);
          image-rendering: pixelated;
          transition: all 0.3s ease;
        }
        
        .pixel-button-large:hover {
          transform: translate(3px, 3px);
          box-shadow: 3px 3px 0px rgba(0,0,0,0.4);
        }
        
        .pixel-card {
          border: 3px solid #333;
          border-radius: 0;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.2);
          image-rendering: pixelated;
          transition: all 0.2s ease;
        }
        
        .pixel-card:hover {
          transform: translate(1px, 1px);
          box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
        }
        
        .pixel-card-selected {
          border: 3px solid #2196f3;
          box-shadow: 4px 4px 0px rgba(33,150,243,0.3);
        }
        
        .pixel-icon {
          border: 2px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-icon-box {
          border: 3px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-icon-large {
          border: 3px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-header {
          margin-Top:35px;
          border: 4px solid #333;
          border-radius: 0;
          box-shadow: 8px 8px 0px rgba(0,0,0,0.3);
          image-rendering: pixelated;
        }
        
        .pixel-input {
          border-radius: 0;
          image-rendering: pixelated;
          font-family: 'Courier Prime', monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .pixel-textarea {
          border-radius: 0;
          image-rendering: pixelated;
          font-family: 'Courier Prime', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .pixel-info-box {
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-content {
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-info {
          border: 2px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-step {
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-step-number {
          border: 2px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        .pixel-decoration {
          border: 2px solid #333;
          border-radius: 0;
          image-rendering: pixelated;
        }
        
        @keyframes pixelPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pixelPulse 2s infinite;
        }
        
        /* Improved readability for different screen sizes */
        @media (max-width: 768px) {
          .pixel-font-heading {
            font-size: 0.7rem;
            line-height: 1.8;
          }
          
          .pixel-font-body {
            font-size: 0.9rem;
            line-height: 1.6;
          }
        }
        
        @media (min-width: 769px) {
          .pixel-font-heading {
            line-height: 1.5;
          }
          
          .pixel-font-body {
            font-size: 1rem;
            line-height: 1.7;
          }
        }
`}</style>
 {currentView === 'home' && <HomeView />}
      {currentView === 'extract' && <ExtractView />}
      {currentView === 'saved' && <SavedView />}
      {showApiModal && <ApiKeyModal />}
    </div>
  );
};

export default Demo;