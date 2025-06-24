
const RAPIDAPI_KEY = '4e38d9d9b4msh953031350ac1088p174d47jsn46b37c589fe4';

interface AIGenerationRequest {
  prompt: string;
  field?: string;
  yearsOfExperience?: string;
}

interface AIGenerationResponse {
  summary?: string;
  experience?: string;
  skills?: string[];
}

export const generateResumeContent = async (request: AIGenerationRequest): Promise<AIGenerationResponse> => {
  try {
    // Using a general AI text generation endpoint - you may need to adjust based on the specific RapidAPI service
    const response = await fetch('https://openai80.p.rapidapi.com/chat/completions', {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writing assistant. Generate professional, concise, and relevant content for resumes. Format your response as JSON with fields: summary, experience, and skills (array).'
          },
          {
            role: 'user',
            content: `Generate professional resume content for: ${request.prompt}. Include a professional summary (2-3 sentences), key experience points (bullet format), and relevant skills list.`
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Try to parse JSON response, fallback to text parsing if needed
    try {
      return JSON.parse(aiResponse);
    } catch {
      // Fallback: parse text response manually
      return parseTextResponse(aiResponse, request.prompt);
    }
  } catch (error) {
    console.error('RapidAPI error:', error);
    // Fallback to local generation if API fails
    return generateLocalFallback(request);
  }
};

const parseTextResponse = (text: string, prompt: string): AIGenerationResponse => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract skills from the response or prompt
  const commonSkills = ['javascript', 'react', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker', 'sql', 'git'];
  const extractedSkills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill) || lowerPrompt.includes(skill)
  );

  return {
    summary: extractSummaryFromText(text) || generateQuickSummary(prompt),
    experience: extractExperienceFromText(text) || generateQuickExperience(prompt),
    skills: extractedSkills.length > 0 ? extractedSkills : generateQuickSkills(prompt)
  };
};

const extractSummaryFromText = (text: string): string | undefined => {
  const summaryMatch = text.match(/summary[:\-\s]*(.*?)(?:\n\n|experience|skills)/is);
  return summaryMatch ? summaryMatch[1].trim() : undefined;
};

const extractExperienceFromText = (text: string): string | undefined => {
  const experienceMatch = text.match(/experience[:\-\s]*(.*?)(?:\n\n|skills|$)/is);
  return experienceMatch ? experienceMatch[1].trim() : undefined;
};

const generateLocalFallback = (request: AIGenerationRequest): AIGenerationResponse => {
  const prompt = request.prompt.toLowerCase();
  const years = request.yearsOfExperience || '3';
  
  let field = 'technology';
  if (prompt.includes('engineer') || prompt.includes('developer')) field = 'engineering';
  else if (prompt.includes('design')) field = 'design';
  else if (prompt.includes('marketing')) field = 'marketing';
  else if (prompt.includes('manager')) field = 'management';

  const summaries = {
    engineering: `Results-driven software engineer with ${years}+ years of experience developing scalable applications and leading technical initiatives.`,
    design: `Creative designer with ${years}+ years of experience creating user-centered digital experiences.`,
    marketing: `Strategic marketing professional with ${years}+ years of experience driving brand growth and customer acquisition.`,
    management: `Experienced leader with ${years}+ years of management experience building high-performing teams.`,
    technology: `Technology professional with ${years}+ years of experience delivering innovative solutions.`
  };

  const experiences = {
    engineering: `• Designed and implemented scalable software solutions\n• Collaborated with cross-functional teams to deliver high-quality products\n• Optimized application performance and established coding best practices`,
    design: `• Created user interface designs that improved user engagement\n• Conducted user research and usability testing\n• Developed and maintained design systems`,
    marketing: `• Developed marketing campaigns that increased lead generation\n• Analyzed market trends and customer data\n• Managed marketing budget allocation and ROI optimization`,
    management: `• Led cross-functional teams to deliver complex projects\n• Implemented process improvements that increased productivity\n• Mentored team members and supported professional development`,
    technology: `• Implemented technology solutions that improved operational efficiency\n• Managed technical projects from requirements through deployment\n• Established best practices for system maintenance and security`
  };

  return {
    summary: summaries[field as keyof typeof summaries],
    experience: experiences[field as keyof typeof experiences],
    skills: generateQuickSkills(request.prompt)
  };
};

const generateQuickSummary = (prompt: string): string => {
  return `Professional with expertise in ${prompt.split(' ').slice(0, 3).join(' ')} and proven track record of delivering results.`;
};

const generateQuickExperience = (prompt: string): string => {
  return `• Delivered successful projects and initiatives\n• Collaborated effectively with team members\n• Contributed to organizational growth and success`;
};

const generateQuickSkills = (prompt: string): string[] => {
  const words = prompt.toLowerCase().split(/[\s,]+/);
  const skillKeywords = ['react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker', 'sql', 'git'];
  const foundSkills = words.filter(word => skillKeywords.includes(word));
  return foundSkills.length > 0 ? foundSkills : ['Communication', 'Problem Solving', 'Teamwork'];
};
