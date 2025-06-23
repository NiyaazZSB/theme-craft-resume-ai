
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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Mock AI generation - replace with actual GPT-4 API call
    setTimeout(() => {
      const mockContent = {
        summary: `Dynamic and results-driven professional with expertise in ${prompt}. Proven track record of delivering high-quality solutions and driving business growth through innovative approaches and strategic thinking.`,
        experience: `• Led initiatives in ${prompt} resulting in improved efficiency and performance
• Collaborated with cross-functional teams to deliver projects on time and within budget
• Implemented best practices and modern methodologies to optimize workflows
• Mentored team members and contributed to knowledge sharing across the organization`,
        skills: prompt.split(',').map(skill => skill.trim()).filter(Boolean)
      };
      
      onGenerate(mockContent);
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
          Describe your career, skills, or industry to generate professional content
        </p>
        <Textarea
          placeholder="e.g., Software Engineer, 5 years experience, React, Node.js, AWS"
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
              Generate AI Content
            </>
          )}
        </Button>
        <p className="text-xs text-gray-600 mt-2">
          This will enhance your resume with AI-generated professional content
        </p>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
