import { useState } from 'react';
import { Loader, AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import {
  industries,
  technologyDomains,
  businessModels,
  targetAudiences,
  marketSegments,
} from './data/industries';
import { generateProjectDocument } from './services/gemini';
import type { ProjectFocus } from './types';

// Define focus options with proper typing
const focusOptions: { value: ProjectFocus; label: string }[] = [
  { value: 'problem', label: 'I am trying to solve a problem' },
  { value: 'market', label: 'I am trying to address a market gap' }
];

function App() {
  const [step, setStep] = useState<number>(1);
  const [focus, setFocus] = useState<ProjectFocus>('problem');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedBusinessModel, setSelectedBusinessModel] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [selectedMarketSegment, setSelectedMarketSegment] = useState<string>('');
  const [problems, setProblems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProblems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateProjectDocument({
        focus,
        industry: selectedIndustry,
        subIndustry: selectedSubIndustry,
        technology: selectedTechnology,
        businessModel: selectedBusinessModel,
        audience: selectedAudience,
        marketSegment: selectedMarketSegment,
      });
      setProblems(result.problems);
      setStep(8);
    } catch (error) {
      console.error('Error generating problems:', error);
      setError('An error occurred while generating problems. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFocus('problem');
    setSelectedIndustry('');
    setSelectedSubIndustry('');
    setSelectedTechnology('');
    setSelectedBusinessModel('');
    setSelectedAudience('');
    setSelectedMarketSegment('');
    setProblems([]);
    setError(null);
  };

  const renderError = () => (
    <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg">
      <AlertCircle className="w-5 h-5" />
      <span>{error}</span>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-gray-600">Generating project ideas...</p>
    </div>
  );

  const renderStep = () => {
    if (error) {
      return renderError();
    }
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Which of the following best describes the primary focus of your start-up idea?
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {focusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFocus(option.value);
                    setStep(2);
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300 transition-colors"
                  aria-selected={focus === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Primary Industry</h2>
            <div className="grid grid-cols-1 gap-4">
              {industries.map((industry) => (
                <button
                  key={industry.name}
                  onClick={() => {
                    setSelectedIndustry(industry.name);
                    setStep(3);
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300"
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Sub-Industry</h2>
            <div className="grid grid-cols-1 gap-4">
              {industries
                .find((i) => i.name === selectedIndustry)
                ?.subIndustries.map((subIndustry) => (
                  <button
                    key={subIndustry}
                    onClick={() => {
                      setSelectedSubIndustry(subIndustry);
                      setStep(4);
                    }}
                    className="p-4 rounded-lg border hover:border-blue-300"
                  >
                    {subIndustry}
                  </button>
                ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Technology Domain</h2>
            <div className="grid grid-cols-1 gap-4">
              {technologyDomains.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    setSelectedTechnology(tech);
                    setStep(5);
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Business Model</h2>
            <div className="grid grid-cols-1 gap-4">
              {businessModels.map((model) => (
                <button
                  key={model}
                  onClick={() => {
                    setSelectedBusinessModel(model);
                    setStep(6);
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Target Audience</h2>
            <div className="grid grid-cols-1 gap-4">
              {targetAudiences.map((audience) => (
                <button
                  key={audience}
                  onClick={() => {
                    setSelectedAudience(audience);
                    setStep(7);
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300"
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select the Market Segment</h2>
            <div className="grid grid-cols-1 gap-4">
              {marketSegments.map((segment) => (
                <button
                  key={segment}
                  onClick={() => {
                    setSelectedMarketSegment(segment);
                    handleGenerateProblems();
                  }}
                  className="p-4 rounded-lg border hover:border-blue-300"
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Suggested Problems</h2>
            {problems.length > 0 ? (
              <>
                <ul className="list-disc pl-6 space-y-2">
                  {problems.map((problem, index) => (
                    <li key={index} className="text-gray-700">{problem}</li>
                  ))}
                </ul>
                <button
                  onClick={resetForm}
                  className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
              </>
            ) : (
              <p className="text-gray-500">No problems generated yet. Please try again.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderProgress = () => {
    const totalSteps = 8;
    const progress = (step / totalSteps) * 100;

    return (
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-4">
          {step > 1 && (
            <button
              onClick={goBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-2xl font-bold">Project Idea Generator</h1>
        </div>
        {renderProgress()}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {error && renderError()}
          {isLoading ? renderLoading() : renderStep()}
        </div>
      </div>
    </div>
  );
}

export default App;