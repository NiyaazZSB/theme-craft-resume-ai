
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { generateResumeContent } from '../services/rapidApiService';

interface AIContentGeneratorProps {
  onGenerate: (content: { summary?: string; experience?: string; skills?: string[] }) => void;
}

const AIContentGenerator = ({ onGenerate }: AIContentGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      // Extract years of experience if mentioned in prompt
      const yearsMatch = prompt.match(/(\d+)\s*year/i);
      const years = yearsMatch ? yearsMatch[1] : undefined;

      // Determine field/industry from prompt
      const lowerPrompt = prompt.toLowerCase();
      let field = 'technology';
      if (lowerPrompt.includes('engineer') || lowerPrompt.includes('developer')) field = 'engineering';
      else if (lowerPrompt.includes('design')) field = 'design';
      else if (lowerPrompt.includes('marketing')) field = 'marketing';
      else if (lowerPrompt.includes('manager')) field = 'management';

      const content = await generateResumeContent({
        prompt,
        field,
        yearsOfExperience: years
      });

      onGenerate(content);
    } catch (error) {
      console.error('Failed to generate AI content:', error);
      // Still show some feedback to user even if generation fails
      onGenerate({
        summary: 'AI generation encountered an issue. Please try again or edit manually.',
        skills: ['Communication', 'Problem Solving']
      });
    } finally {
      setIsGenerating(false);
    }
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
              Generating with AI...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Professional Content
            </>
          )}
        </Button>
        <p className="text-xs text-gray-600 mt-2">
          Powered by RapidAPI - generates professional summary, experience bullets, and relevant skills
        </p>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
