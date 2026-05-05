import React from 'react';
import { Code, Smartphone, Database, Layout, Globe, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const skills = [
    { name: "Web Development", icon: <Globe size={20} /> },
    { name: "Mobile App Development", icon: <Smartphone size={20} /> },
    { name: "API & Backend", icon: <Database size={20} /> },
    { name: "UI/UX Improvements", icon: <Layout size={20} /> },
    { name: "Database Management", icon: <Code size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-12">
        
        {/* Left Content: Bio & Intro */}
        <div className="lg:w-3/5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for Collaborations
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Shishir Shahi</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            I am a passionate Software Engineer, BIT graduate, and current MCS student with hands-on experience in web and mobile application development. I enjoy building clean, user-friendly, and scalable digital solutions that solve real problems.
          </p>

          <p className="text-md text-slate-500 dark:text-slate-500 mb-10 italic border-l-4 border-indigo-500 pl-4">
            "I combine academic learning with practical project work to deliver reliable and modern software solutions. I believe in continuous learning, clean code, and professional communication."
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25">
              View Projects <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              Download CV
            </button>
          </div>
        </div>

        {/* Right Content: Skills Card */}
        <div className="lg:w-2/5 mt-12 lg:mt-0">
          <div className="relative group">
            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Core Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <div className="text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;