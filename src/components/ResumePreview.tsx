import { ResumeData, Theme, ResumeStyle } from './ResumeBuilder';

interface ResumePreviewProps {
  data: ResumeData;
  theme: Theme;
  style: ResumeStyle;
}

const themeColors = {
  blue: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  red: {
    primary: 'bg-red-600',
    secondary: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
  },
  green: {
    primary: 'bg-green-600',
    secondary: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  purple: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  orange: {
    primary: 'bg-orange-600',
    secondary: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  dark: {
    primary: 'bg-gray-800',
    secondary: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
  },
};

const ResumePreview = ({ data, theme, style }: ResumePreviewProps) => {
  const colors = themeColors[theme];

  // Helper placeholders
  const Placeholder = ({ text }: { text: string }) => (
    <div className="text-gray-400 italic text-sm py-2">{text}</div>
  );

  const ModernStyle = () => (
    <div className="resume-preview bg-white min-h-[1000px] w-full shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className={`${colors.primary} text-white p-8 rounded-t-lg`}>
        <div className="flex items-center gap-6">
          {data.personalInfo.photo ? (
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white flex-shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-4xl font-bold border-4 border-white flex-shrink-0">
              <span role="img" aria-label="profile">👤</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold break-words">{data.personalInfo.fullName || 'Your Name'}</h1>
            <div className="mt-2 space-y-1 text-blue-100">
              <p className="break-words">{data.personalInfo.email || <span className="text-blue-200">your@email.com</span>}</p>
              <p>{data.personalInfo.phone || <span className="text-blue-200">+1234567890</span>}</p>
              <p className="break-words">{data.personalInfo.location || <span className="text-blue-200">Your Location</span>}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {data.personalInfo.summary ? (
          <section className="experience-item">
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed break-words">{data.personalInfo.summary}</p>
          </section>
        ) : (
          <Placeholder text="Add a professional summary to introduce yourself." />
        )}

        {/* Experience */}
        <section>
          <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Work Experience</h2>
          {data.experience.length > 0 ? (
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className={`border-l-4 ${colors.border} pl-4 experience-item`}>
                  <h3 className="font-semibold text-lg break-words">{exp.position || <span className="text-gray-400">Position</span>}</h3>
                  <p className={`${colors.text} font-medium break-words`}>{exp.company || <span className="text-gray-300">Company</span>}</p>
                  <p className="text-gray-600 text-sm mb-2">{exp.duration || <span className="text-gray-300">Duration</span>}</p>
                  <p className="text-gray-700 break-words">{exp.description || <span className="text-gray-300">Description</span>}</p>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="No work experience added yet." />
          )}
        </section>

        {/* Education */}
        <section>
          <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Education</h2>
          {data.education.length > 0 ? (
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="education-item">
                  <h3 className="font-semibold break-words">{edu.degree || <span className="text-gray-400">Degree</span>}</h3>
                  <p className={`${colors.text} break-words`}>{edu.school || <span className="text-gray-300">School/University</span>}</p>
                  <p className="text-gray-600 text-sm">{edu.year || <span className="text-gray-300">Year</span>}</p>
                  {edu.description && <p className="text-gray-700 text-sm break-words">{edu.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="No education added yet." />
          )}
        </section>

        {/* Skills and Languages */}
        <div className="grid grid-cols-2 gap-6">
          <section className="skills-container">
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Skills</h2>
            {data.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`${colors.secondary} ${colors.text} px-3 py-1 rounded-full text-sm break-words`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <Placeholder text="No skills added yet." />
            )}
          </section>

          <section className="skills-container">
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Languages</h2>
            {data.languages.length > 0 ? (
              <div className="space-y-1">
                {data.languages.map((language, index) => (
                  <p key={index} className="text-gray-700 break-words">{language}</p>
                ))}
              </div>
            ) : (
              <Placeholder text="No languages added yet." />
            )}
          </section>
        </div>
      </div>
    </div>
  );

  const ClassicStyle = () => (
    <div className="resume-preview bg-white min-h-[800px] w-full shadow-lg p-8 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        {data.personalInfo.photo ? (
          <img
            src={data.personalInfo.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
            <span role="img" aria-label="profile">👤</span>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 break-words">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-gray-600">
          <p className="break-words">{data.personalInfo.email || <span className="text-gray-400">your@email.com</span>} • {data.personalInfo.phone || <span className="text-gray-400">+1234567890</span>}</p>
          <p className="break-words">{data.personalInfo.location || <span className="text-gray-400">Your Location</span>}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        <section className="experience-item">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
          <hr className="mb-3" />
          {data.personalInfo.summary ? (
            <p className="text-gray-700 break-words">{data.personalInfo.summary}</p>
          ) : (
            <Placeholder text="Add a professional summary to introduce yourself." />
          )}
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Experience</h2>
          <hr className="mb-3" />
          {data.experience.length > 0 ? (
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="font-semibold break-words">{exp.position || <span className="text-gray-400">Position</span>}</h3>
                      <p className="text-gray-600 break-words">{exp.company || <span className="text-gray-300">Company</span>}</p>
                    </div>
                    <p className="text-gray-600 text-sm flex-shrink-0">{exp.duration || <span className="text-gray-300">Duration</span>}</p>
                  </div>
                  <p className="text-gray-700 mt-1 break-words">{exp.description || <span className="text-gray-300">Description</span>}</p>
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="No work experience added yet." />
          )}
        </section>

        {/* Education */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Education</h2>
          <hr className="mb-3" />
          {data.education.length > 0 ? (
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="education-item">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="font-semibold break-words">{edu.degree || <span className="text-gray-400">Degree</span>}</h3>
                      <p className="text-gray-600 break-words">{edu.school || <span className="text-gray-300">School/University</span>}</p>
                    </div>
                    <p className="text-gray-600 text-sm flex-shrink-0">{edu.year || <span className="text-gray-300">Year</span>}</p>
                  </div>
                  {edu.description && <p className="text-gray-700 text-sm break-words">{edu.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <Placeholder text="No education added yet." />
          )}
        </section>

        {/* Skills and Languages */}
        <div className="grid grid-cols-2 gap-6">
          <section className="skills-container">
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Skills</h2>
            <hr className="mb-3" />
            {data.skills.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 break-words">{skill}</li>
                ))}
              </ul>
            ) : (
              <Placeholder text="No skills added yet." />
            )}
          </section>

          <section className="skills-container">
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Languages</h2>
            <hr className="mb-3" />
            {data.languages.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {data.languages.map((language, index) => (
                  <li key={index} className="text-gray-700 break-words">{language}</li>
                ))}
              </ul>
            ) : (
              <Placeholder text="No languages added yet." />
            )}
          </section>
        </div>
      </div>
    </div>
  );

  const CreativeStyle = () => (
    <div className="resume-preview bg-white shadow-lg rounded-lg overflow-hidden flex flex-col" style={{ width: 793, height: 1122 }}>
      <div className="h-full flex" style={{ height: '100%' }}>
        {/* Sidebar */}
        <div className={`${colors.primary} text-white p-6 flex flex-col items-center rounded-l-lg`} style={{ width: 220, minWidth: 220, height: '100%' }}>
          <div className="text-center mb-6">
            {data.personalInfo.photo ? (
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4 text-4xl font-bold border-4 border-white">
                <span role="img" aria-label="profile">👤</span>
              </div>
            )}
            <h1 className="text-xl font-bold break-words">{data.personalInfo.fullName || 'Your Name'}</h1>
          </div>

          <div className="space-y-6 w-full">
            <div>
              <h2 className="text-lg font-bold mb-3">Contact</h2>
              <div className="space-y-2 text-sm">
                <p className="break-words">{data.personalInfo.email || <span className="text-blue-100">your@email.com</span>}</p>
                <p>{data.personalInfo.phone || <span className="text-blue-100">+1234567890</span>}</p>
                <p className="break-words">{data.personalInfo.location || <span className="text-blue-100">Your Location</span>}</p>
              </div>
            </div>

            <div className="skills-container">
              <h2 className="text-lg font-bold mb-3">Skills</h2>
              {data.skillsWithLevels && data.skillsWithLevels.length > 0 ? (
                <div className="space-y-2">
                  {data.skillsWithLevels.map((skillData, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="break-words flex-1">{skillData.skill}</span>
                        <span className="text-xs flex-shrink-0 ml-2">{skillData.level}%</span>
                      </div>
                      <div className="bg-white bg-opacity-30 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-300" 
                          style={{ width: `${skillData.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Placeholder text="No skills added yet." />
              )}
            </div>

            <div className="skills-container">
              <h2 className="text-lg font-bold mb-3">Languages</h2>
              {data.languages.length > 0 ? (
                <div className="space-y-1">
                  {data.languages.map((language, index) => (
                    <p key={index} className="text-sm break-words">{language}</p>
                  ))}
                </div>
              ) : (
                <Placeholder text="No languages added yet." />
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 flex flex-col justify-start h-full" style={{ minWidth: 0, height: '100%' }}>
          <div className="space-y-8">
            {/* Summary */}
            <section className="experience-item">
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>About Me</h2>
              {data.personalInfo.summary ? (
                <p className="text-gray-700 leading-relaxed break-words">{data.personalInfo.summary}</p>
              ) : (
                <Placeholder text="Add a professional summary to introduce yourself." />
              )}
            </section>

            {/* Experience */}
            <section>
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Experience</h2>
              {data.experience.length > 0 ? (
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 experience-item">
                      <div className={`absolute left-0 top-2 w-3 h-3 ${colors.primary} rounded-full flex-shrink-0`}></div>
                      <h3 className="font-semibold text-lg break-words">{exp.position || <span className="text-gray-400">Position</span>}</h3>
                      <p className={`${colors.text} font-medium break-words`}>{exp.company || <span className="text-gray-300">Company</span>}</p>
                      <p className="text-gray-600 text-sm mb-2">{exp.duration || <span className="text-gray-300">Duration</span>}</p>
                      <p className="text-gray-700 text-sm break-words">{exp.description || <span className="text-gray-300">Description</span>}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <Placeholder text="No work experience added yet." />
              )}
            </section>

            {/* Education */}
            <section>
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Education</h2>
              {data.education.length > 0 ? (
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative pl-6 education-item">
                      <div className={`absolute left-0 top-2 w-3 h-3 ${colors.primary} rounded-full flex-shrink-0`}></div>
                      <h3 className="font-semibold break-words">{edu.degree || <span className="text-gray-400">Degree</span>}</h3>
                      <p className={`${colors.text} break-words`}>{edu.school || <span className="text-gray-300">School/University</span>}</p>
                      <p className="text-gray-600 text-sm">{edu.year || <span className="text-gray-300">Year</span>}</p>
                      {edu.description && <p className="text-gray-700 text-sm break-words">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <Placeholder text="No education added yet." />
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStyle = () => {
    switch (style) {
      case 'modern':
        return <ModernStyle />;
      case 'classic':
        return <ClassicStyle />;
      case 'creative':
        return <CreativeStyle />;
      default:
        return <ModernStyle />;
    }
  };

  return (
    <div className="resume-preview-container w-full bg-gray-100 flex justify-center py-8 overflow-auto">
      <div
        className="relative bg-white shadow-lg rounded-lg flex items-center justify-center"
        style={{
          aspectRatio: '793/1122',
          width: '100%',
          maxWidth: '793px',
          maxHeight: '90vh',
          height: 'auto',
          minWidth: '320px',
          minHeight: '400px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            maxWidth: 793,
            maxHeight: 1122,
            minWidth: 320,
            minHeight: 400,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
          }}
        >
          {renderStyle()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;