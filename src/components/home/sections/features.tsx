import Container from "./container";

const features = [
  {
    title: "Proven CV Templates To Increase Hiring Chance",
    desc: "Level from expertly crafted templates to boost your hiring chances designed to showcase your strengths and impress recruiters.",
    icon: "📄",
  },
  {
    title: "Creative, Modern And Clean Templates Design",
    desc: "Choose designs that are modern, clean and easy to scan; tailored for highlight your most important skills and experiences.",
    icon: "✨",
  },
  {
    title: "Easy And Intuitive Online CV Resume Builder",
    desc: "User-friendly platform with step-by-step prompts; build a polished resume in minutes with minimal effort.",
    icon: "🧩",
  },
  {
    title: "Free To Use, Developed By Hiring Professionals",
    desc: "Created with insights from recruiters, ensuring formats and guidance align with real hiring standards.",
    icon: "🧠",
  },
  {
    title: "Recruiter Approved Phrases With Model Notifications",
    desc: "Smart suggestions help you write impactful bullet points; quickly improve clarity and relevance.",
    icon: "✅",
  },
  {
    title: "Fast Easy CV And Resume Formatting",
    desc: "Consistent spacing, headings and alignment; export-ready formatting that looks professional instantly.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-14">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Our Main Features
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Discover Powerful Tools Designed to Help You Create A Professional and Polished CV with Ease
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-900/5 dark:bg-white/10 flex items-center justify-center text-lg">
                {f.icon}
              </div>

              <h3 className="mt-4 font-bold leading-snug text-slate-900 dark:text-white">
                {f.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
