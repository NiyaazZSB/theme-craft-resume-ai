import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Download, Camera, Wand2, Palette, Layout } from 'lucide-react';
import ResumePreview from './ResumePreview';
import ThemeSelector from './ThemeSelector';
import StyleSelector from './StyleSelector';
import PhotoUpload from './PhotoUpload';
import AIContentGenerator from './AIContentGenerator';
import { exportToPDF } from '../utils/pdfExport';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    photo?: string;
  };
  experience: Array<{
    id: string;
    position: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  skillsWithLevels: Array<{
    skill: string;
    level: number;
  }>;
  languages: string[];
}

export type Theme = 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'dark';
export type ResumeStyle = 'modern' | 'classic' | 'creative';

const ResumeBuilder = () => {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Set up the animated resume background on the body
  useEffect(() => {
    console.log('Setting up resume background...');
    const TILE_SIZE = 120;
    const LOGO_SIZE = 64;
    const BG_COLOR = '#f6f7f8';
    const LOGO_SRC = '/resume-icon.svg';
    const body = document.body;
    
    console.log('Body element:', body);
    
    // Create a pattern tile
    const canvas = document.createElement('canvas');
    canvas.width = TILE_SIZE;
    canvas.height = TILE_SIZE;
    const ctx = canvas.getContext('2d');
    
    // Add keyframes to the document first
    const style = document.createElement('style');
    style.id = 'resume-animation-styles';
    style.innerHTML = `
      @keyframes resume-diagonal-move { 
        0% { background-position: 0 0; } 
        100% { background-position: ${TILE_SIZE}px ${TILE_SIZE}px; } 
      }
    `;
    document.head.appendChild(style);
    console.log('Animation styles added');
    
    if (ctx) {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
      
      const img = new window.Image();
      img.src = LOGO_SRC;
      img.onload = () => {
        console.log('Image loaded successfully');
        ctx.globalAlpha = 0.18;
        ctx.drawImage(
          img,
          (TILE_SIZE - LOGO_SIZE) / 2,
          (TILE_SIZE - LOGO_SIZE) / 2,
          LOGO_SIZE,
          LOGO_SIZE
        );
        const dataUrl = canvas.toDataURL();
        console.log('Canvas data URL generated:', dataUrl.substring(0, 50) + '...');
        
        body.style.setProperty('background-image', `url('${dataUrl}')`, 'important');
        body.style.setProperty('background-repeat', 'repeat', 'important');
        body.style.setProperty('background-size', `${TILE_SIZE}px ${TILE_SIZE}px`, 'important');
        body.style.setProperty('background-color', BG_COLOR, 'important');
        body.style.setProperty('animation', 'resume-diagonal-move 18s linear infinite', 'important');
        console.log('Background applied to body with !important');
        
        // Debug: Check if styles are actually applied
        console.log('Applied styles check:');
        console.log('Background image:', body.style.backgroundImage);
        console.log('Background color:', body.style.backgroundColor);
        console.log('Animation:', body.style.animation);
        console.log('Computed styles:', window.getComputedStyle(body).backgroundImage);
      };
      
      img.onerror = () => {
        console.error('Failed to load resume icon from:', LOGO_SRC);
        // Fallback - just set background color and animation
        body.style.animation = 'resume-diagonal-move 18s linear infinite';
      };
    }
    
    body.style.setProperty('background-color', BG_COLOR, 'important');
    console.log('Background color set to:', BG_COLOR);
    
    return () => {
      console.log('Cleaning up resume background...');
      // Clean up - remove important styles
      body.style.removeProperty('background-image');
      body.style.removeProperty('background-repeat');
      body.style.removeProperty('background-size');
      body.style.removeProperty('background-color');
      body.style.removeProperty('animation');
      const existingStyle = document.getElementById('resume-animation-styles');
      if (existingStyle && document.head.contains(existingStyle)) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);
  
  const [activeTab, setActiveTab] = useState('personal');
  const [currentTheme, setCurrentTheme] = useState<Theme>('blue');
  const [currentStyle, setCurrentStyle] = useState<ResumeStyle>('modern');
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    skillsWithLevels: [],
    languages: [],
  });

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      position: '',
      company: '',
      duration: '',
      description: '',
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: '',
      description: '',
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addSkillWithLevel = (skill: string, level: number = 70) => {
    if (skill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skillsWithLevels: [...prev.skillsWithLevels, { skill: skill.trim(), level }]
      }));
    }
  };

  const updateSkillLevel = (index: number, level: number) => {
    setResumeData(prev => ({
      ...prev,
      skillsWithLevels: prev.skillsWithLevels.map((skillData, i) => 
        i === index ? { ...skillData, level } : skillData
      )
    }));
  };

  const removeSkillWithLevel = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skillsWithLevels: prev.skillsWithLevels.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = (language: string) => {
    if (language.trim()) {
      setResumeData(prev => ({
        ...prev,
        languages: [...prev.languages, language.trim()]
      }));
    }
  };

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    try {
      await exportToPDF(previewRef.current, resumeData.personalInfo.fullName || 'resume');
      toast({
        title: "Success!",
        description: "Your resume has been exported as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = (photoDataUrl: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, photo: photoDataUrl }
    }));
  };

  const handleAIGeneration = (content: { summary?: string; experience?: string; skills?: string[] }) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      if (content.summary) {
        newData.personalInfo.summary = content.summary;
      }
      
      if (content.experience && prev.experience.length > 0) {
        newData.experience[0].description = content.experience;
      }
      
      if (content.skills) {
        newData.skills = [...new Set([...prev.skills, ...content.skills])];
      }
      
      return newData;
    });
    
    toast({
      title: "AI Content Generated!",
      description: "Your resume has been enhanced with AI-generated content.",
    });
  };

  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 mx-4 shadow-xl border border-white/20">
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Resume Builder
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Create a professional resume with AI assistance and modern styling
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              <StyleSelector currentStyle={currentStyle} onStyleChange={setCurrentStyle} />
              <Button onClick={handleExportPDF} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-white/20">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-6">
                    <PhotoUpload onPhotoUpload={handlePhotoUpload} currentPhoto={resumeData.personalInfo.photo} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Full Name"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      />
                      <Input
                        placeholder="Location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      />
                    </div>
                    
                    <Textarea
                      placeholder="Professional Summary"
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      rows={4}
                    />

                    <AIContentGenerator onGenerate={handleAIGeneration} />
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button onClick={addExperience} size="sm">Add Experience</Button>
                    </div>
                    
                    {resumeData.experience.map((exp) => (
                      <Card key={exp.id} className="p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            />
                            <Input
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            />
                          </div>
                          <Input
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            value={exp.duration}
                            onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                          />
                          <Textarea
                            placeholder="Job description and achievements"
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                          />
                          <Button 
                            onClick={() => removeExperience(exp.id)} 
                            variant="destructive" 
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button onClick={addEducation} size="sm">Add Education</Button>
                    </div>
                    
                    {resumeData.education.map((edu) => (
                      <Card key={edu.id} className="p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            />
                            <Input
                              placeholder="School/University"
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            />
                          </div>
                          <Input
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                          />
                          <Textarea
                            placeholder="Additional details"
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            rows={2}
                          />
                          <Button 
                            onClick={() => removeEducation(edu.id)} 
                            variant="destructive" 
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4 mt-6">
                    {currentStyle === 'creative' ? (
                      <SkillsWithLevelsSection
                        items={resumeData.skillsWithLevels}
                        onAdd={addSkillWithLevel}
                        onRemove={removeSkillWithLevel}
                        onUpdateLevel={updateSkillLevel}
                      />
                    ) : (
                      <SkillsSection
                        title="Skills"
                        items={resumeData.skills}
                        onAdd={addSkill}
                        onRemove={removeSkill}
                        placeholder="Add a skill"
                      />
                    )}
                    
                    <SkillsSection
                      title="Languages"
                      items={resumeData.languages}
                      onAdd={addLanguage}
                      onRemove={removeLanguage}
                      placeholder="Add a language"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-4">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border border-white/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <div ref={previewRef}>
                  <ResumePreview 
                    data={resumeData} 
                    theme={currentTheme} 
                    style={currentStyle}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkillsSectionProps {
  title: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

const SkillsSection = ({ title, items, onAdd, onRemove, placeholder }: SkillsSectionProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleAdd} size="sm">Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {item}
            <button
              onClick={() => onRemove(index)}
              className="text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SkillsWithLevelsSectionProps {
  items: Array<{ skill: string; level: number }>;
  onAdd: (skill: string, level: number) => void;
  onRemove: (index: number) => void;
  onUpdateLevel: (index: number, level: number) => void;
}

const SkillsWithLevelsSection = ({ items, onAdd, onRemove, onUpdateLevel }: SkillsWithLevelsSectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [levelValue, setLevelValue] = useState(70);

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue, levelValue);
      setInputValue('');
      setLevelValue(70);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skills (with proficiency levels)</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Input
            type="number"
            min="0"
            max="100"
            placeholder="Level"
            value={levelValue}
            onChange={(e) => setLevelValue(Number(e.target.value))}
            className="w-20"
          />
          <Button onClick={handleAdd} size="sm">Add</Button>
        </div>
        <p className="text-xs text-gray-600">Set skill level from 0-100% for the creative style</p>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.skill}</span>
                <span className="text-sm text-gray-600">{item.level}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={item.level}
                  onChange={(e) => onUpdateLevel(index, Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={item.level}
                  onChange={(e) => onUpdateLevel(index, Number(e.target.value))}
                  className="w-16 text-center"
                />
              </div>
            </div>
            <Button
              onClick={() => onRemove(index)}
              variant="destructive"
              size="sm"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder;
