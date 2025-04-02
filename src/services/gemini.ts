import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAUYr1XUV6xqmIzw1oBalNPdW3iP9sJSf4');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export const generateProjectDocument = async ({
  focus,
  industry,
  subIndustry,
  technology,
  businessModel,
  audience,
  marketSegment,
}: {
  focus: string;
  industry: string;
  subIndustry: string;
  technology: string;
  businessModel: string;
  audience: string;
  marketSegment: string;
}) => {
  const prompt = `Based on the following inputs, suggest 10 related problems:
  - Focus: ${focus}
  - Industry: ${industry}
  - Sub-Industry: ${subIndustry}
  - Technology Domain: ${technology}
  - Business Model: ${businessModel}
  - Target Audience: ${audience}
  - Market Segment: ${marketSegment}

  Provide the problems in a numbered list format.Give them as Points format no need explantion for each point.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    if (!response || !response.text) {
      throw new Error('Invalid response from the API');
    }
    const problems = response.text().split('\n').filter((line) => line.trim());
    return { problems };
  } catch (error) {
    console.error('Error generating project document:', error);
    throw new Error('Failed to generate project document. Please try again later.');
  }
};