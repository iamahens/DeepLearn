import React, { useState } from 'react';
import { Upload, Sparkles, BookOpen, Save, Edit, Trash2, Zap, Target, Brain } from 'lucide-react';

const StudyCenterMain = () => {
  const [activeTab, setActiveTab] = useState('Quiz');
  const [quizTitle, setQuizTitle] = useState('');
  const [studyMaterial, setStudyMaterial] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [autoExtract, setAutoExtract] = useState(true);
  const [verbatimMode, setVerbatimMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [error, setError] = useState('');

  const questionTypes = [
    { id: 'Multiple Choice', label: 'Multiple Choice', desc: 'Questions with multiple options to choose from', icon: '🎯' },
    { id: 'True/False', label: 'True/False', desc: 'Simple true or false questions', icon: '✓' },
    { id: 'Statement True/False', label: 'Statement True/False', desc: 'Evaluate the truth of multiple statements', icon: '📋' },
    { id: 'Identification', label: 'Identification', desc: 'Fill-in-the-blank questions to test recall', icon: '🔤' },
    { id: 'Mixed Types', label: 'Mixed Types', desc: 'Combination of different question types', icon: '🎲' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudyMaterial(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const generateQuizWithGemini = async (material, numQuestions, questionType) => {
    const prompt = `Based on the following study material, create ${numQuestions} ${questionType} questions. 
    
Study Material:
${material}

Instructions:
- Create exactly ${numQuestions} questions
- Use ${questionType} format
- Make questions challenging but fair
- Include correct answers
- For multiple choice: provide 4 options (A, B, C, D)
- For true/false: just provide the statement
- Focus on key concepts and important details

Return the response in this JSON format:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"], // for multiple choice only
      "correctAnswer": "Correct answer here",
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz with Gemini API');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    return JSON.parse(jsonMatch[0]);
  };

  const generateQuiz = async () => {
    if (!apiKey) {
      setShowApiDialog(true);
      return;
    }

    if (!studyMaterial.trim()) {
      setError('Please provide study material first!');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      const quizData = await generateQuizWithGemini(studyMaterial, numQuestions, questionType);
      
      const quiz = {
        title: quizTitle || 'Generated Quiz',
        questions: quizData.questions.map((q, i) => ({
          id: i + 1,
          question: q.question,
          type: questionType,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }))
      };
      
      setGeneratedQuiz(quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
      setError('Error generating quiz. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveQuiz = () => {
    if (generatedQuiz) {
      setSavedQuizzes([...savedQuizzes, { ...generatedQuiz, id: Date.now() }]);
      setError('');
      // Show success message briefly
      setError('Quiz saved successfully! 🎉');
      setTimeout(() => setError(''), 3000);
    }
  };

  const deleteSavedQuiz = (id) => {
    setSavedQuizzes(savedQuizzes.filter(quiz => quiz.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-6 sm:p-8" style={{ 
      fontFamily: 'monospace', 
      imageRendering: 'pixelated',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Pixelated Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #000 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, #000 2px, transparent 2px)
        `,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto"> {/* Added max-width and mx-auto for better centering */}
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-black text-white px-6 py-3 md:px-8 md:py-4 text-2xl md:text-3xl font-bold border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 md:gap-3">
              <Brain className="text-yellow-400" size={28} md:size={32} /> {/* Adjusted icon size */}
              QUIZ MASTER 3000
              <Sparkles className="text-yellow-400" size={28} md:size={32} /> {/* Adjusted icon size */}
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <div className="bg-yellow-400 text-black px-5 py-2 text-base md:text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
            🎮 RETRO STUDY CENTER - LEVEL UP YOUR KNOWLEDGE! 🎮
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className={`mb-6 p-3 md:p-4 border-3 border-black font-bold text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${ /* Reduced border and shadow */
            error.includes('successfully') ? 'bg-green-400 text-black' : 'bg-red-400 text-black'
          }`}>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {['Quiz', 'Flashcards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-orange-400 text-black'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {tab === 'Quiz' ? '🎯' : '📚'} {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Quiz Creation Panel */}
          <div className="xl:col-span-3 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8"> {/* Increased padding */}
            {/* Quiz Title */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <label className="text-lg md:text-xl font-bold">🏷️ QUIZ TITLE</label>
                <span className="ml-3 bg-orange-400 text-black px-2 py-1 text-xs border-2 border-black font-bold">OPTIONAL</span> {/* Adjusted size */}
              </div>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter an epic quiz title..."
                className="w-full p-3 text-base md:text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all" /* Reduced padding, border, shadow */
              />
            </div>

            {/* Study Material */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3"> {/* Added flex-col for mobile */}
                <div className="flex items-center mb-2 md:mb-0">
                  <label className="text-lg md:text-xl font-bold">📚 STUDY MATERIAL</label>
                  <span className="ml-3 bg-red-400 text-black px-2 py-1 text-xs border-2 border-black font-bold">STEP 1</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAutoExtract(!autoExtract)}
                    className={`px-3 py-1 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      autoExtract ? 'bg-blue-400 text-black' : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
                  >
                    🤖 AUTO EXTRACT
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={studyMaterial}
                  onChange={(e) => setStudyMaterial(e.target.value)}
                  placeholder="Paste your study material here... The AI will extract key concepts and create questions!"
                  className="w-full h-40 p-3 text-base md:text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] resize-none focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all" /* Reduced padding, border, shadow */
                />
                <div className="absolute top-3 right-3">
                  <label className="cursor-pointer bg-purple-400 text-black px-3 py-1 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-500 transition-all flex items-center gap-2">
                    <Upload size={14} /> {/* Adjusted icon size */}
                    UPLOAD FILE
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".txt,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Quiz Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Number of Questions */}
              <div>
                <div className="flex items-center mb-3">
                  <label className="text-lg md:text-xl font-bold">🎯 QUESTIONS</label>
                  <span className="ml-3 bg-blue-400 text-black px-2 py-1 text-xs border-2 border-black font-bold">STEP 2</span>
                </div>
                <div className="bg-gradient-to-r from-blue-200 to-purple-200 p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-black">{numQuestions}</div>
                    <div className="text-sm font-bold">QUESTIONS</div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" /* Reduced height, shadow */
                    style={{
                      background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${(numQuestions/20)*100}%, #d1d5db ${(numQuestions/20)*100}%, #d1d5db 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs font-bold mt-2">
                    <span>MIN</span>
                    <span>MAX</span>
                  </div>
                </div>
              </div>

              {/* Question Type */}
              <div>
                <div className="flex items-center mb-3">
                  <label className="text-lg md:text-xl font-bold">⚡ QUESTION TYPE</label>
                  <span className="ml-3 bg-green-400 text-black px-2 py-1 text-xs border-2 border-black font-bold">STEP 3</span>
                </div>
                <div className="bg-gradient-to-r from-green-200 to-yellow-200 p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{questionTypes.find(t => t.id === questionType)?.icon}</div>
                    <div className="font-bold text-lg">{questionType}</div>
                  </div>
                  <p className="text-sm mb-4 font-bold">
                    {questionTypes.find(t => t.id === questionType)?.desc}
                  </p>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full p-2 border-3 border-black bg-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" /* Reduced padding, border, shadow */
                  >
                    {questionTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Verbatim Mode */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen size={24} />
                  <div>
                    <div className="font-bold text-lg">📖 VERBATIM MODE</div>
                    <div className="text-sm">Use exact text from material</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={verbatimMode}
                    onChange={(e) => setVerbatimMode(e.target.checked)}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer border-3 border-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div> {/* Reduced size, border, shadow */}
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateQuiz}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-black py-5 text-xl md:text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3" /* Adjusted padding, text size */
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin">⚡</div>
                  GENERATING QUIZ...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  🚀 GENERATE QUIZ 🚀
                </>
              )}
            </button>
          </div>

          {/* Saved Quizzes Panel */}
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8"> {/* Increased padding */}
            <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-black p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"> {/* Reduced padding */}
              <Save size={18} /> {/* Adjusted icon size */}
              <span className="font-bold text-lg">💾 SAVED QUIZZES</span>
            </div>
            
            {savedQuizzes.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎮</div> {/* Adjusted size */}
                <p className="text-lg font-bold mb-4">NO SAVED QUIZZES YET</p>
                <div className="bg-yellow-200 border-3 border-black p-3 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"> {/* Reduced border, padding, shadow */}
                  Create and save a quiz to start your collection!
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {savedQuizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-gradient-to-r from-blue-100 to-purple-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"> {/* Reduced border, shadow */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base">{quiz.title}</h3> {/* Adjusted text size */}
                      <button
                        onClick={() => deleteSavedQuiz(quiz.id)}
                        className="text-red-600 hover:text-red-800 bg-red-200 p-1 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all" /* Reduced padding, border, shadow */
                      >
                        <Trash2 size={14} /> {/* Adjusted icon size */}
                      </button>
                    </div>
                    <p className="text-sm font-bold">🎯 {quiz.questions.length} questions</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generated Quiz Display */}
        {generatedQuiz && (
          <div className="mt-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8"> {/* Increased padding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"> {/* Added flex-col for mobile */}
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4 md:mb-0">
                <Target size={28} /> {/* Adjusted icon size */}
                🎯 REVIEW YOUR QUIZ
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={saveQuiz}
                  className="bg-gradient-to-r from-green-400 to-blue-400 text-black px-5 py-2 md:px-6 md:py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2" /* Adjusted padding, text size */
                >
                  <Save size={18} /> {/* Adjusted icon size */}
                  💾 SAVE QUIZ
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {generatedQuiz.questions.map((question, index) => (
                <div key={question.id} className="bg-gradient-to-r from-gray-100 to-blue-100 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"> {/* Added flex-col for mobile */}
                    <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-0">🎯 QUESTION {index + 1}</h3>
                    <div className="flex gap-2">
                      <button className="bg-yellow-300 px-2 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                        <Edit size={10} /> {/* Adjusted icon size */}
                        EDIT
                      </button>
                      <button className="bg-red-300 px-2 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <p className="mb-4 text-base md:text-lg font-bold">{question.question}</p>
                  
                  {question.options.length > 0 && (
                    <div className="space-y-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            option === question.correctAnswer ? 'bg-green-300' : 'bg-white'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-blue-200 border-2 border-black">
                      <strong>💡 Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Key Dialog */}
        {showApiDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 max-w-md w-full"> {/* Increased padding */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🔑</div>
                <h2 className="text-2xl font-bold mb-2">ENTER API KEY</h2>
                <p className="text-sm font-bold text-red-600">Required to generate quizzes with AI</p>
              </div>
              
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full p-3 mb-6 border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" /* Reduced padding, border, shadow */
              />
              
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => {
                    setShowApiDialog(false);
                    if (apiKey) generateQuiz();
                  }}
                  className="flex-1 bg-green-400 text-black py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  🚀 SAVE & CONTINUE
                </button>
                <button
                  onClick={() => setShowApiDialog(false)}
                  className="flex-1 bg-red-400 text-black py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  ❌ CANCEL
                </button>
              </div>
              
              <div className="text-sm bg-yellow-200 border-2 border-black p-3"> {/* Reduced padding */}
                <p className="font-bold mb-2">🎯 HOW TO GET YOUR API KEY:</p>
                <ol className="list-decimal ml-4 space-y-1 font-bold">
                  <li>Go to Google AI Studio</li>
                  <li>Sign in with Google account</li>
                  <li>Click "Get API key"</li>
                  <li>Create new project key</li>
                  <li>Copy & paste here</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyCenterMain;