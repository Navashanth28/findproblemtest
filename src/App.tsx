import React, { useState } from 'react';
import {
  industries,
  technologyDomains,
  businessModels,
  targetAudiences,
  marketSegments,
} from './data/industries';
import { generateProjectDocument } from './services/gemini';
import ReactMarkdown from 'react-markdown';

function App() {
  const [step, setStep] = useState<number>(1);
  const [focus, setFocus] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedBusinessModel, setSelectedBusinessModel] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [selectedMarketSegment, setSelectedMarketSegment] = useState<string>('');
  const [problems, setProblems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateProblems = async () => {
    setIsLoading(true);
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
      alert('An error occurred while generating problems. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Which of the following best describes the primary focus of your start-up idea?
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {['I am trying to solve a problem', 'I am trying to address a market gap', 'I am providing a better solution to the existing solution in the market'].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFocus(option);
                      setStep(2);
                    }}
                    className="p-4 rounded-lg border hover:border-blue-300"
                  >
                    {option}
                  </button>
                )
              )}
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
            <ul className="list-disc pl-6">
              {problems.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8">Project Idea Generator</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </div>
  );
}

export default App;