
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';

interface AIContentGeneratorProps {
  onGenerate: (content: { summary?: string; experience?: string; skills?: string[] }) => void;
}

const AIContentGenerator = ({ onGenerate }: AIContentGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const extractSkillsFromPrompt = (prompt: string): string[] => {
    // Look for common skill-related keywords and patterns
    const skillKeywords = ['react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker', 'kubernetes', 'sql', 'mongodb', 'git', 'agile', 'scrum', 'leadership', 'management', 'communication', 'problem solving', 'analytical thinking'];
    const words = prompt.toLowerCase().split(/[\s,]+/);
    
    // Find skills mentioned in the prompt
    const foundSkills = words.filter(word => 
      skillKeywords.includes(word) || 
      word.endsWith('.js') || 
      word.endsWith('js') ||
      (word.length > 2 && /^[a-z]+$/i.test(word))
    );
    
    // Remove duplicates and return unique skills
    return [...new Set(foundSkills)].slice(0, 5); // Limit to 5 skills
  };

  const generateProfessionalContent = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Determine field/industry context
    let field = 'technology';
    if (lowerPrompt.includes('marketing') || lowerPrompt.includes('sales')) field = 'marketing';
    else if (lowerPrompt.includes('design') || lowerPrompt.includes('ui') || lowerPrompt.includes('ux')) field = 'design';
    else if (lowerPrompt.includes('finance') || lowerPrompt.includes('accounting')) field = 'finance';
    else if (lowerPrompt.includes('engineer') || lowerPrompt.includes('developer')) field = 'engineering';
    else if (lowerPrompt.includes('manager') || lowerPrompt.includes('management')) field = 'management';

    // Extract years of experience if mentioned
    const yearsMatch = prompt.match(/(\d+)\s*year/i);
    const years = yearsMatch ? yearsMatch[1] : '3';

    // Generate more realistic and professional content
    const summaries = {
      engineering: `Results-driven software engineer with ${years}+ years of experience developing scalable applications and leading technical initiatives. Proven expertise in modern development practices, with a strong focus on code quality, performance optimization, and collaborative problem-solving.`,
      design: `Creative and detail-oriented designer with ${years}+ years of experience creating user-centered digital experiences. Skilled in translating complex requirements into intuitive designs that drive user engagement and business growth.`,
      marketing: `Strategic marketing professional with ${years}+ years of experience driving brand growth and customer acquisition. Proven track record of developing data-driven campaigns that increase market reach and revenue.`,
      finance: `Analytical finance professional with ${years}+ years of experience in financial planning, analysis, and strategic decision-making. Expert in identifying opportunities for cost optimization and revenue enhancement.`,
      management: `Experienced leader with ${years}+ years of management experience building high-performing teams and delivering strategic initiatives. Skilled in cross-functional collaboration and driving organizational growth.`,
      technology: `Technology professional with ${years}+ years of experience delivering innovative solutions and driving digital transformation. Proven ability to work with complex systems and lead technical projects from conception to completion.`
    };

    const experiences = {
      engineering: `• Designed and implemented scalable software solutions serving thousands of users daily
• Collaborated with cross-functional teams to deliver high-quality products on schedule
• Optimized application performance resulting in 40% faster load times
• Mentored junior developers and established coding best practices across the team
• Led technical architecture decisions for critical system components`,
      design: `• Created user interface designs that improved user engagement by 35%
• Conducted user research and usability testing to inform design decisions
• Collaborated with development teams to ensure design feasibility and implementation
• Developed and maintained design systems for consistent brand experience
• Led design workshops and presented concepts to stakeholders`,
      marketing: `• Developed and executed marketing campaigns that increased lead generation by 50%
• Analyzed market trends and customer data to identify growth opportunities
• Managed marketing budget allocation and optimized ROI across channels
• Collaborated with sales teams to align marketing efforts with revenue goals
• Created compelling content that enhanced brand awareness and customer engagement`,
      finance: `• Conducted financial analysis and reporting that supported strategic business decisions
• Managed budget planning and forecasting processes for multiple departments
• Identified cost-saving opportunities that reduced expenses by 15%
• Collaborated with leadership team on financial planning and investment strategies
• Streamlined financial processes to improve efficiency and accuracy`,
      management: `• Led cross-functional teams of 10+ members to deliver complex projects on time
• Implemented process improvements that increased team productivity by 25%
• Mentored team members and supported their professional development
• Facilitated stakeholder communications and managed project timelines
• Drove strategic initiatives that contributed to organizational growth`,
      technology: `• Implemented technology solutions that improved operational efficiency by 30%
• Managed technical projects from requirements gathering through deployment
• Collaborated with stakeholders to identify and prioritize technology needs
• Established best practices for system maintenance and security protocols
• Led digital transformation initiatives across multiple departments`
    };

    return {
      summary: summaries[field as keyof typeof summaries],
      experience: experiences[field as keyof typeof experiences],
      skills: extractSkillsFromPrompt(prompt)
    };
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Generate more professional content based on the prompt
    setTimeout(() => {
      const content = generateProfessionalContent(prompt);
      onGenerate(content);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="border-dashed border-blue-300 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">AI Content Generator</h3>
        </div>
        <p className="text-sm text-blue-700 mb-3">
          Describe your role, experience level, and key skills to generate professional content
        </p>
        <Textarea
          placeholder="e.g., Senior Software Engineer with 5 years experience in React, Node.js, and cloud architecture"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-3"
          rows={2}
        />
        <Button 
          onClick={handleGenerate} 
          disabled={!prompt.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Professional Content
            </>
          )}
        </Button>
        <p className="text-xs text-gray-600 mt-2">
          This will generate a professional summary, experience bullets, and extract relevant skills
        </p>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
