import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, BookOpen, Save, Edit, Trash2, Zap, Target, Brain, Code, ClipboardCopy, Folder } from 'lucide-react';

// --- Quiz Generator Component ---
const QuizGenerator = ({ apiKey, setApiKey, savedQuizzes, setSavedQuizzes }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [studyMaterial, setStudyMaterial] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [autoExtract, setAutoExtract] = useState(true);
  const [verbatimMode, setVerbatimMode] = useState(false);
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
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
      throw new Error(`Failed to generate quiz with Gemini API. Status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini API. Could not find JSON.');
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
    setGeneratedQuiz(null);

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
      setError(`Error generating quiz: ${error.message}. Please check your API key and try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveQuiz = () => {
    if (generatedQuiz) {
      setSavedQuizzes([...savedQuizzes, { ...generatedQuiz, id: Date.now() }]);
      setError('Quiz saved successfully! 🎉');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="w-full max-w-10xl mx-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 lg:p-8">
        {/* Error/Success Messages */}
        {error && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 border-3 border-black font-bold text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base ${
            error.includes('successfully') || error.includes('deleted') ? 'bg-green-400 text-black' : 'bg-red-400 text-black'
          }`}>
            {error}
          </div>
        )}

        {/* Quiz Title */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center mb-3">
            <label className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-0">🏷️ QUIZ TITLE</label>
            <span className="bg-orange-400 text-black px-2 py-1 text-xs border-2 border-black font-bold sm:ml-3 w-fit">OPTIONAL</span>
          </div>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter an epic quiz title..."
            className="w-full p-2 sm:p-3 text-sm sm:text-base lg:text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
          />
        </div>

        {/* Study Material */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
              <label className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-0">📚 STUDY MATERIAL</label>
              <span className="bg-red-400 text-black px-2 py-1 text-xs border-2 border-black font-bold sm:ml-3 w-fit">STEP 1</span>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => setAutoExtract(!autoExtract)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
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
              className="w-full h-32 sm:h-40 p-2 sm:p-3 text-sm sm:text-base lg:text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] resize-none focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <label className="cursor-pointer bg-purple-400 text-black px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-500 transition-all flex items-center gap-1 sm:gap-2">
                <Upload size={12} className="sm:hidden" />
                <Upload size={14} className="hidden sm:block" />
                <span className="hidden sm:inline">UPLOAD FILE</span>
                <span className="sm:hidden">FILE</span>
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Number of Questions */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center mb-3">
              <label className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-0">🎯 QUESTIONS</label>
              <span className="bg-blue-400 text-black px-2 py-1 text-xs border-2 border-black font-bold sm:ml-3 w-fit">STEP 2</span>
            </div>
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 p-4 sm:p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-center mb-4">
                <div className="text-3xl sm:text-4xl font-bold text-black">{numQuestions}</div>
                <div className="text-xs sm:text-sm font-bold">QUESTIONS</div>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
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
            <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4">
              <label className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-0">⚡ QUESTION TYPE</label>
              <span className="bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:ml-4 w-fit">STEP 3</span>
            </div>
            <div className="bg-gradient-to-r from-green-300 to-yellow-400 p-4 sm:p-6 lg:p-8 border-4 sm:border-5 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="text-xl sm:text-2xl lg:text-3xl">{questionTypes.find(t => t.id === questionType)?.icon}</div>
                <div className="font-bold text-base sm:text-lg lg:text-xl">{questionType}</div>
              </div>
              <p className="text-sm sm:text-base mb-3 sm:mb-5 font-bold">
                {questionTypes.find(t => t.id === questionType)?.desc}
              </p>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full p-2 sm:p-3 border-3 sm:border-4 border-black bg-white font-bold text-sm sm:text-base lg:text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
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
        <div className="mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-3 sm:p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-0">
              <BookOpen size={20} className="sm:hidden" />
              <BookOpen size={24} className="hidden sm:block" />
              <div>
                <div className="font-bold text-base sm:text-lg">📖 VERBATIM MODE</div>
                <div className="text-xs sm:text-sm">Use exact text from material</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={verbatimMode}
                onChange={(e) => setVerbatimMode(e.target.checked)}
              />
              <div className="w-12 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none rounded-full peer border-2 sm:border-3 border-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border-2 after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-purple-600 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQuiz}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-black py-4 sm:py-5 text-lg sm:text-xl lg:text-2xl font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin">⚡</div>
              <span className="hidden sm:inline">GENERATING QUIZ...</span>
              <span className="sm:hidden">GENERATING...</span>
            </>
          ) : (
            <>
              <Zap size={20} className="sm:hidden" />
              <Zap size={24} className="hidden sm:block" />
              <span className="hidden sm:inline">🚀 GENERATE QUIZ 🚀</span>
              <span className="sm:hidden">🚀 GENERATE 🚀</span>
            </>
          )}
        </button>

        {/* Generated Quiz Display */}
        {generatedQuiz && (
          <div className="mt-6 sm:mt-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3 mb-4 lg:mb-0">
                <Target size={24} className="sm:hidden" />
                <Target size={28} className="hidden sm:block" />
                <span className="hidden sm:inline">🎯 REVIEW YOUR QUIZ</span>
                <span className="sm:hidden">🎯 REVIEW QUIZ</span>
              </h2>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={saveQuiz}
                  className="bg-gradient-to-r from-green-400 to-blue-400 text-black px-3 sm:px-5 lg:px-6 py-2 sm:py-2 lg:py-3 text-sm sm:text-base font-bold border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-1 sm:gap-2"
                >
                  <Save size={14} className="sm:hidden" />
                  <Save size={18} className="hidden sm:block" />
                  <span className="hidden sm:inline">💾 SAVE QUIZ</span>
                  <span className="sm:hidden">💾 SAVE</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {generatedQuiz.questions.map((question, index) => (
                <div key={question.id} className="bg-gradient-to-r from-gray-100 to-blue-100 border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4">
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-0">🎯 QUESTION {index + 1}</h3>
                    <div className="flex gap-2">
                      <button className="bg-yellow-300 px-2 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                        <Edit size={10} />
                        EDIT
                      </button>
                      <button className="bg-red-300 px-2 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg font-bold">{question.question}</p>
                  
                  {question.options.length > 0 && (
                    <div className="space-y-2 sm:space-y-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 sm:p-3 border-2 border-black font-bold text-sm sm:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            option === question.correctAnswer ? 'bg-green-300' : 'bg-white'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.explanation && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-200 border-2 border-black text-sm sm:text-base">
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
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 lg:p-8 max-w-md w-full">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔑</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">ENTER API KEY</h2>
                <p className="text-xs sm:text-sm font-bold text-red-600">Required to generate quizzes with AI</p>
              </div>
              
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full p-2 sm:p-3 mb-4 sm:mb-6 border-3 border-black font-bold text-sm sm:text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              />
              
              <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button
                  onClick={() => {
                    setShowApiDialog(false);
                    if (apiKey) generateQuiz();
                  }}
                  className="flex-1 bg-green-400 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  🚀 SAVE & CONTINUE
                </button>
                <button
                  onClick={() => setShowApiDialog(false)}
                  className="flex-1 bg-red-400 text-black py-2 sm:py-3 text-sm sm:text-base font-bold border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  ❌ CANCEL
                </button>
              </div>
              
              <div className="text-xs sm:text-sm bg-yellow-200 border-2 border-black p-2 sm:p-3">
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

// --- Code Generator Component ---
const CodeGenerator = ({ apiKey, setApiKey, savedSnippets, setSavedSnippets }) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('JavaScript');
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { id: 'JavaScript', label: 'JavaScript', icon: 'JS' },
    { id: 'Python', label: 'Python', icon: 'PY' },
    { id: 'HTML/CSS', label: 'HTML/CSS', icon: 'WEB' },
    { id: 'React', label: 'React (JS)', icon: '⚛️' },
    { id: 'Java', label: 'Java', icon: '☕' },
    { id: 'C++', label: 'C++', icon: 'C++' },
    { id: 'Go', label: 'Go', icon: 'GO' },
    { id: 'SQL', label: 'SQL', icon: 'DB' },
    { id: 'Shell Script', label: 'Shell', icon: 'SH' },
    { id: 'JSON', label: 'JSON', icon: '{}' },
  ];

  const handleGenerateCode = async () => {
    if (!apiKey) {
      setShowApiDialog(true);
      return;
    }

    if (!userPrompt.trim()) {
      setError('Please provide a description for the code you want to generate!');
      return;
    }

    setIsGenerating(true);
    setGeneratedCode(null);
    setError('');

    const prompt = `Generate a complete, runnable code snippet in ${targetLanguage} based on the following description.
Provide only the code, without any conversational text, explanations, or markdown syntax outside of the code block itself.

Description:
${userPrompt}

IMPORTANT:
- Respond ONLY with the code.
- Do NOT include any introductory or concluding sentences.
- Do NOT include any explanations or comments outside of the code block.
- Ensure the code is complete and runnable.
- If the request is complex, provide a simplified but functional example.
- Wrap the code in a markdown code block (e.g., \`\`\`${targetLanguage.toLowerCase()}\ncode here\n\`\`\`).`;

     try {
           const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
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
             throw new Error(`API call failed with status: ${response.status}`);
           }
     
           const data = await response.json();
           let generatedText = data.candidates[0]?.content?.parts[0]?.text || '';
     
           // Attempt to extract code block if present
           const codeBlockMatch = generatedText.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
           const codeToDisplay = codeBlockMatch ? codeBlockMatch[1].trim() : generatedText.trim();
     
           if (codeToDisplay) {
             setGeneratedCode({
               title: userPrompt.substring(0, 50) + (userPrompt.length > 50 ? '...' : ''),
               language: targetLanguage,
               code: codeToDisplay,
             });
           } else {
             setError('No code generated. Please try a different prompt.');
           }
     
         } catch (error) {
           console.error('Error generating code:', error);
           setError(`Error generating code: ${error.message}. Please check your API key and try again.`);
         } finally {
           setIsGenerating(false);
         }
       };
     
       const saveCode = () => {
         if (generatedCode) {
           setSavedSnippets([...savedSnippets, { ...generatedCode, id: Date.now() }]);
           setError('Code snippet saved successfully! 🎉');
           setTimeout(() => setError(''), 3000);
         }
       };
     
       const handleCopyCode = (code) => {
         if (code) {
           const textarea = document.createElement('textarea');
           textarea.value = code;
           document.body.appendChild(textarea);
           textarea.select();
           try {
             document.execCommand('copy');
             setError('Code copied to clipboard! 📋');
           } catch (err) {
             console.error('Failed to copy code:', err);
             setError('Failed to copy code. Please try manually.');
           } finally {
             document.body.removeChild(textarea);
             setTimeout(() => setError(''), 3000);
           }
         }
       };
     
       return (
         <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
           {/* Error/Success Messages */}
           {error && (
             <div className={`mb-6 p-3 md:p-4 border-3 border-black font-bold text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
               error.includes('successfully') || error.includes('copied') ? 'bg-green-400 text-black' : 'bg-red-400 text-black'
             }`}>
               {error}
             </div>
           )}
     
           {/* Code Description Input */}
           <div className="mb-6">
             <div className="flex items-center mb-3">
               <label className="text-lg md:text-xl font-bold">📝 CODE DESCRIPTION</label>
               <span className="ml-3 bg-blue-400 text-black px-2 py-1 text-xs border-2 border-black font-bold">STEP 1</span>
             </div>
             <textarea
               value={userPrompt}
               onChange={(e) => setUserPrompt(e.target.value)}
               placeholder="Describe the code you need (e.g., 'a simple JavaScript function to sum two numbers', 'HTML structure for a blog post', 'Python script to read a CSV file')..."
               className="w-full h-40 p-3 text-base md:text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] resize-none focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
             />
           </div>
     
           {/* Language Selection - Made more visible and cleaner */}
           <div className="mb-6">
             <div className="flex items-center mb-4">
               <label className="text-xl md:text-2xl font-bold text-gray-800">🌐 TARGET LANGUAGE</label>
               <span className="ml-4 bg-orange-500 text-white px-3 py-1 text-sm border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">STEP 2</span>
             </div>
             <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-8 border-5 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
               <div className="flex items-center gap-4 mb-4">
                 <div className="text-3xl">{languages.find(l => l.id === targetLanguage)?.icon}</div>
                 <div className="font-bold text-xl">{targetLanguage}</div>
               </div>
               <p className="text-base mb-5 font-bold">
                 Select the programming language for your generated code.
               </p>
               <select
                 value={targetLanguage}
                 onChange={(e) => setTargetLanguage(e.target.value)}
                 className="w-full p-3 border-4 border-black bg-white font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
               >
                 {languages.map((lang) => (
                   <option key={lang.id} value={lang.id}>
                     {lang.icon} {lang.label}
                   </option>
                 ))}
               </select>
             </div>
           </div>
     
           {/* Generate Button */}
           <button
             onClick={handleGenerateCode}
             disabled={isGenerating}
             className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-black py-5 text-xl md:text-2xl font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
           >
             {isGenerating ? (
               <>
                 <div className="animate-spin">⚡</div>
                 GENERATING CODE...
               </>
             ) : (
               <>
                 <Zap size={24} />
                 ✨ GENERATE CODE ✨
               </>
             )}
           </button>
     
           {/* Generated Code Display */}
           {generatedCode && (
             <div className="mt-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                 <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4 md:mb-0">
                   <Code size={28} />
                   ✨ YOUR GENERATED CODE ✨
                 </h2>
                 <div className="flex gap-3">
                   <button
                     onClick={() => handleCopyCode(generatedCode.code)}
                     className="bg-gradient-to-r from-blue-400 to-cyan-400 text-black px-5 py-2 md:px-6 md:py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                   >
                     <ClipboardCopy size={18} />
                     COPY CODE
                   </button>
                   <button
                     onClick={saveCode}
                     className="bg-gradient-to-r from-green-400 to-lime-400 text-black px-5 py-2 md:px-6 md:py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                   >
                     <Save size={18} />
                     SAVE SNIPPET
                   </button>
                 </div>
               </div>
               
               <div className="bg-gray-800 text-green-300 p-4 rounded-lg overflow-x-auto border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <pre className="whitespace-pre-wrap break-words">
                   <code>{generatedCode.code}</code>
                 </pre>
               </div>
             </div>
           )}
     
           {/* API Key Dialog */}
           {showApiDialog && (
             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
               <div className="bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 max-w-md w-full">
                 <div className="text-center mb-6">
                   <div className="text-4xl mb-4">🔑</div>
                   <h2 className="text-2xl font-bold mb-2">ENTER API KEY</h2>
                   <p className="text-sm font-bold text-red-600">Required to generate code with AI</p>
                 </div>
                 
                 <input
                   type="password"
                   value={apiKey}
                   onChange={(e) => setApiKey(e.target.value)}
                   placeholder="Enter your Gemini API key..."
                   className="w-full p-3 mb-6 border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                 />
                 
                 <div className="flex gap-3 mb-6">
                   <button
                     onClick={() => {
                       setShowApiDialog(false);
                       if (apiKey) handleGenerateCode();
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
                 
                 <div className="text-sm bg-yellow-200 border-2 border-black p-3">
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
       );
     };
     
     // --- Saved Items Display Component ---
     const SavedItemsDisplay = ({ savedQuizzes, savedSnippets, deleteSavedQuiz, handleDeleteCode, handleCopyCode }) => {
       return (
         <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
           <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-black p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             <Folder size={18} />
             <span className="font-bold text-lg">💾 YOUR SAVED ITEMS</span>
           </div>
     
           {savedQuizzes.length === 0 && savedSnippets.length === 0 ? (
             <div className="text-center py-8">
               <div className="text-6xl mb-4">✨</div>
               <p className="text-lg font-bold mb-4">NOTHING SAVED YET!</p>
               <div className="bg-yellow-200 border-3 border-black p-4 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                 Generate and save quizzes or code snippets to see them here!
               </div>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Saved Quizzes Section */}
               <div>
                 <h3 className="text-xl font-bold mb-4 bg-blue-200 p-2 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                   🎯 Saved Quizzes ({savedQuizzes.length})
                 </h3>
                 {savedQuizzes.length === 0 ? (
                   <p className="text-center text-gray-600 font-bold py-4">No quizzes saved.</p>
                 ) : (
                   <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                     {savedQuizzes.map((quiz) => (
                       <div key={quiz.id} className="bg-gradient-to-r from-blue-100 to-purple-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-base">{quiz.title}</h4>
                           <button
                             onClick={() => deleteSavedQuiz(quiz.id)}
                             className="text-red-600 hover:text-red-800 bg-red-200 p-1 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                             title="Delete Quiz"
                           >
                             <Trash2 size={14} />
                           </button>
                         </div>
                         <p className="text-sm font-bold">🎯 {quiz.questions.length} questions</p>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
     
               {/* Saved Code Snippets Section */}
               <div>
                 <h3 className="text-xl font-bold mb-4 bg-green-200 p-2 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                   💻 Saved Code Snippets ({savedSnippets.length})
                 </h3>
                 {savedSnippets.length === 0 ? (
                   <p className="text-center text-gray-600 font-bold py-4">No code snippets saved.</p>
                 ) : (
                   <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                     {savedSnippets.map((snippet) => (
                       <div key={snippet.id} className="bg-gradient-to-r from-lime-100 to-green-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-base">{snippet.title}</h4>
                           <div className="flex gap-2">
                             <button
                               onClick={() => handleCopyCode(snippet.code)}
                               className="text-blue-600 hover:text-blue-800 bg-blue-200 p-1 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                               title="Copy Code"
                             >
                               <ClipboardCopy size={14} />
                             </button>
                             <button
                               onClick={() => handleDeleteCode(snippet.id)}
                               className="text-red-600 hover:text-red-800 bg-red-200 p-1 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                               title="Delete Snippet"
                             >
                               <Trash2 size={14} />
                             </button>
                           </div>
                         </div>
                         <p className="text-sm font-bold">🌐 {snippet.language}</p>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           )}
         </div>
       );
     };
     
     // --- Main Hub Component ---
     const StudyCodeHub = () => {
       const [activeTab, setActiveTab] = useState('Quiz');
       const [apiKey, setApiKey] = useState('');
       const [savedQuizzes, setSavedQuizzes] = useState([]);
       const [savedSnippets, setSavedSnippets] = useState([]);
     
       // Load data from localStorage on component mount
       useEffect(() => {
         const storedApiKey = localStorage.getItem('geminiApiKey');
         if (storedApiKey) {
           setApiKey(storedApiKey);
         }
         const storedQuizzes = localStorage.getItem('savedQuizzes');
         if (storedQuizzes) {
           try {
             setSavedQuizzes(JSON.parse(storedQuizzes));
           } catch (e) {
             console.error("Failed to parse saved quizzes from localStorage", e);
             setSavedQuizzes([]);
           }
         }
         const storedSnippets = localStorage.getItem('savedSnippets');
         if (storedSnippets) {
           try {
             setSavedSnippets(JSON.parse(storedSnippets));
           } catch (e) {
             console.error("Failed to parse saved snippets from localStorage", e);
             setSavedSnippets([]);
           }
         }
       }, []);
     
       // Save data to localStorage whenever it changes
       useEffect(() => {
         localStorage.setItem('geminiApiKey', apiKey);
       }, [apiKey]);
     
       useEffect(() => {
         localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
       }, [savedQuizzes]);
     
       useEffect(() => {
         localStorage.setItem('savedSnippets', JSON.stringify(savedSnippets));
       }, [savedSnippets]);
     
       const deleteSavedQuiz = (id) => {
         setSavedQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== id));
       };
     
       const handleDeleteCode = (id) => {
         setSavedSnippets(prevSnippets => prevSnippets.filter(snippet => snippet.id !== id));
       };
     
       const handleCopyCode = (code) => {
         if (code) {
           const textarea = document.createElement('textarea');
           textarea.value = code;
           document.body.appendChild(textarea);
           textarea.select();
           try {
             document.execCommand('copy');
             // Acknowledge copy success, perhaps via a temporary message state in StudyCodeHub
             // For now, it's handled by the individual component if it needs immediate feedback
           } catch (err) {
             console.error('Failed to copy code:', err);
           } finally {
             document.body.removeChild(textarea);
           }
         }
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
     
           <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 bg-gray-100 bg-opacity-90 rounded-lg border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"> {/* Added padding and background to main content area */}
             {/* Header */}
             <div className="flex items-center justify-center mb-8">
               <div className="bg-black text-white px-6 py-3 md:px-8 md:py-4 text-2xl md:text-3xl font-bold border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform hover:scale-105 transition-transform">
                 <div className="flex items-center gap-2 md:gap-3">
                   {activeTab === 'Quiz' && <Brain className="text-yellow-400" size={28} md:size={32} />}
                   {activeTab === 'Code Generator' && <Code className="text-green-400" size={28} md:size={32} />}
                   {activeTab === 'Flashcards' && <BookOpen className="text-blue-400" size={28} md:size={32} />}
                   {activeTab === 'Saved Items' && <Folder className="text-purple-400" size={28} md:size={32} />}
                   {activeTab.toUpperCase()} MASTER 3000
                   <Sparkles className="text-yellow-400" size={28} md:size={32} />
                 </div>
               </div>
             </div>
     
             {/* Subtitle */}
             <div className="text-center mb-8">
               <div className="bg-yellow-400 text-black px-5 py-2 text-base md:text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
                 🎮 RETRO STUDY & CODE HUB - LEVEL UP YOUR KNOWLEDGE! 💻
               </div>
             </div>
     
             {/* Tabs */}
             <div className="flex justify-center mb-8">
               <div className="flex border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 {['Quiz', 'Code Generator', 'Saved Items', 'Flashcards'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold transition-all ${
                       activeTab === tab
                         ? 'bg-orange-400 text-black'
                         : 'bg-gray-200 text-black hover:bg-gray-300'
                     }`}
                   >
                     {tab === 'Quiz' ? '🎯' : tab === 'Code Generator' ? '💻' : tab === 'Saved Items' ? '💾' : '📚'} {tab}
                   </button>
                 ))}
               </div>
             </div>
     
             {/* Conditionally render content based on activeTab */}
             {activeTab === 'Quiz' && (
               <QuizGenerator
                 apiKey={apiKey}
                 setApiKey={setApiKey}
                 savedQuizzes={savedQuizzes}
                 setSavedQuizzes={setSavedQuizzes}
               />
             )}
             {activeTab === 'Code Generator' && (
               <CodeGenerator
                 apiKey={apiKey}
                 setApiKey={setApiKey}
                 savedSnippets={savedSnippets}
                 setSavedSnippets={setSavedSnippets}
               />
             )}
             {activeTab === 'Saved Items' && (
               <SavedItemsDisplay
                 savedQuizzes={savedQuizzes}
                 savedSnippets={savedSnippets}
                 deleteSavedQuiz={deleteSavedQuiz}
                 handleDeleteCode={handleDeleteCode}
                 handleCopyCode={handleCopyCode}
               />
             )}
             {activeTab === 'Flashcards' && (
               <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center text-xl font-bold">
                 <div className="text-6xl mb-4">🚧</div>
                 <p className="mb-4">FLASHCARDS COMING SOON!</p>
                 <div className="bg-yellow-200 border-4 border-black p-4 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   Stay tuned for this exciting feature to help you memorize key concepts!
                 </div>
               </div>
             )}
           </div>
         </div>
       );
     };
     
     export default StudyCodeHub;
     