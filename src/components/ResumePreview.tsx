
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

  const ModernStyle = () => (
    <div className="bg-white min-h-[800px] max-w-2xl mx-auto shadow-lg">
      {/* Header */}
      <div className={`${colors.primary} text-white p-8`}>
        <div className="flex items-center gap-6">
          {data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{data.personalInfo.fullName || 'Your Name'}</h1>
            <div className="mt-2 space-y-1 text-blue-100">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className={`border-l-4 ${colors.border} pl-4`}>
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <p className={`${colors.text} font-medium`}>{exp.company}</p>
                  <p className="text-gray-600 text-sm mb-2">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className={`${colors.text}`}>{edu.school}</p>
                  <p className="text-gray-600 text-sm">{edu.year}</p>
                  {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills and Languages */}
        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <section>
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`${colors.secondary} ${colors.text} px-3 py-1 rounded-full text-sm`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Languages</h2>
              <div className="space-y-1">
                {data.languages.map((language, index) => (
                  <p key={index} className="text-gray-700">{language}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const ClassicStyle = () => (
    <div className="bg-white min-h-[800px] max-w-2xl mx-auto shadow-lg p-8">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        {data.personalInfo.photo && (
          <img
            src={data.personalInfo.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-gray-600">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
            <hr className="mb-3" />
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Experience</h2>
            <hr className="mb-3" />
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.duration}</p>
                  </div>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Education</h2>
            <hr className="mb-3" />
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{edu.year}</p>
                  </div>
                  {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills and Languages */}
        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Skills</h2>
              <hr className="mb-3" />
              <ul className="list-disc list-inside space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">Languages</h2>
              <hr className="mb-3" />
              <ul className="list-disc list-inside space-y-1">
                {data.languages.map((language, index) => (
                  <li key={index} className="text-gray-700">{language}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const CreativeStyle = () => (
    <div className="bg-white min-h-[800px] max-w-2xl mx-auto shadow-lg">
      <div className="grid grid-cols-3 h-full">
        {/* Sidebar */}
        <div className={`${colors.primary} text-white p-6`}>
          <div className="text-center mb-6">
            {data.personalInfo.photo && (
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white"
              />
            )}
            <h1 className="text-xl font-bold">{data.personalInfo.fullName || 'Your Name'}</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-3">Contact</h2>
              <div className="space-y-2 text-sm">
                <p>{data.personalInfo.email}</p>
                <p>{data.personalInfo.phone}</p>
                <p>{data.personalInfo.location}</p>
              </div>
            </div>

            {data.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3">Skills</h2>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{skill}</span>
                      </div>
                      <div className="bg-white bg-opacity-30 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 w-4/5"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3">Languages</h2>
                <div className="space-y-1">
                  {data.languages.map((language, index) => (
                    <p key={index} className="text-sm">{language}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-6">
          <div className="space-y-6">
            {/* Summary */}
            {data.personalInfo.summary && (
              <section>
                <h2 className={`text-xl font-bold ${colors.text} mb-3`}>About Me</h2>
                <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Experience</h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6">
                      <div className={`absolute left-0 top-2 w-3 h-3 ${colors.primary} rounded-full`}></div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className={`${colors.text} font-medium`}>{exp.company}</p>
                      <p className="text-gray-600 text-sm mb-2">{exp.duration}</p>
                      <p className="text-gray-700 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 className={`text-xl font-bold ${colors.text} mb-3`}>Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative pl-6">
                      <div className={`absolute left-0 top-2 w-3 h-3 ${colors.primary} rounded-full`}></div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className={`${colors.text}`}>{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.year}</p>
                      {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
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
    <div className="transform scale-75 origin-top-left">
      {renderStyle()}
    </div>
  );
};

export default ResumePreview;
