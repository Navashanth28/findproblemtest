import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ProjectFocus } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

interface GenerateProjectParams {
  focus: ProjectFocus;
  industry: string;
  subIndustry: string;
  technology: string;
  businessModel: string;
  audience: string;
  marketSegment: string;
}

export const generateProjectDocument = async (params: GenerateProjectParams) => {
  const prompt = `Based on the following inputs, only suggest 10 related problems:
  - Focus: ${params.focus}
  - Industry: ${params.industry}
  - Sub-Industry: ${params.subIndustry}
  - Technology Domain: ${params.technology}
  - Business Model: ${params.businessModel}
  - Target Audience: ${params.audience}
  - Market Segment: ${params.marketSegment}

  Provide the problems in a numbered list format.no need any explanation.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response?.text();
    
    if (!response) {
      throw new Error('No response received from the API');
    }

    const problems = response
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0);

    if (problems.length === 0) {
      throw new Error('No valid problems were generated');
    }

    return { problems };
  } catch (error) {
    console.error('Error generating project document:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to generate project document. Please try again later.'
    );
  }
};