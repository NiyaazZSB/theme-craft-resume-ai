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

const COHERE_API_KEY = import.meta.env.Cohere_Api;

export const generateResumeContent = async (
  request: AIGenerationRequest
): Promise<AIGenerationResponse> => {
  try {
    const systemPrompt = `You are a professional resume writing assistant. Generate professional, concise, and relevant content for resumes. 

Format your response as a JSON object with these exact fields:
- summary: A professional summary (2-3 sentences)
- experience: Key experience points in bullet format (use • for bullets)
- skills: An array of relevant skills

Example format:
{
  "summary": "Results-driven software engineer with 5+ years of experience...",
  "experience": "• Developed scalable web applications\\n• Led cross-functional teams\\n• Improved system performance by 40%",
  "skills": ["JavaScript", "React", "Node.js", "AWS"]
}`;

    const userPrompt = `Generate professional resume content for: ${request.prompt}. Include a professional summary (2-3 sentences), key experience points (bullet format), and relevant skills list.`;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: `${systemPrompt}\n\nUser request: ${userPrompt}`,
        max_tokens: 800,
        temperature: 0.7,
        stop_sequences: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.generations[0].text;

    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch {
      return parseTextResponse(aiResponse, request.prompt);
    }
  } catch (error) {
    console.error('Cohere API error:', error);
    return generateLocalFallback(request);
  }
};

const parseTextResponse = (text: string, prompt: string): AIGenerationResponse => {
  const lowerPrompt = prompt.toLowerCase();

  const commonSkills = ['javascript', 'react', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker', 'sql', 'git'];
  const extractedSkills = commonSkills.filter(skill =>
    text.toLowerCase().includes(skill) || lowerPrompt.includes(skill)
  );

  return {
    summary: extractSummaryFromText(text) || generateQuickSummary(prompt),
    experience: extractExperienceFromText(text) || generateQuickExperience(prompt),
    skills: extractedSkills.length > 0 ? extractedSkills : generateQuickSkills(prompt),
  };
};

const extractSummaryFromText = (text: string): string | undefined => {
  const match = text.match(/summary[:\-\s]*(.*?)(?:\n\n|experience|skills)/is);
  return match ? match[1].trim() : undefined;
};

const extractExperienceFromText = (text: string): string | undefined => {
  const match = text.match(/experience[:\-\s]*(.*?)(?:\n\n|skills|$)/is);
  return match ? match[1].trim() : undefined;
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
    technology: `Technology professional with ${years}+ years of experience delivering innovative solutions.`,
  };

  const experiences = {
    engineering: `• Designed and implemented scalable software solutions\n• Collaborated with cross-functional teams to deliver high-quality products\n• Optimized application performance and established coding best practices`,
    design: `• Created user interface designs that improved user engagement\n• Conducted user research and usability testing\n• Developed and maintained design systems`,
    marketing: `• Developed marketing campaigns that increased lead generation\n• Analyzed market trends and customer data\n• Managed marketing budget allocation and ROI optimization`,
    management: `• Led cross-functional teams to deliver complex projects\n• Implemented process improvements that increased productivity\n• Mentored team members and supported professional development`,
    technology: `• Implemented technology solutions that improved operational efficiency\n• Managed technical projects from requirements through deployment\n• Established best practices for system maintenance and security`,
  };

  return {
    summary: summaries[field as keyof typeof summaries],
    experience: experiences[field as keyof typeof experiences],
    skills: generateQuickSkills(request.prompt),
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
  const keywords = ['react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker', 'sql', 'git'];
  const found = words.filter(word => keywords.includes(word));
  return found.length > 0 ? found : ['Communication', 'Problem Solving', 'Teamwork'];
};
