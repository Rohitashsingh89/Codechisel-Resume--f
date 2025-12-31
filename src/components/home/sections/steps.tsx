import Container from "./container";

const steps = [
  { title: "Create Your Account", icon: "👤" },
  { title: "Choose Your Resume", icon: "🧾" },
  { title: "Add Your Information", icon: "📝" },
  { title: "Download Your Resume", icon: "⬇️" },
];

export default function Steps() {
  return (
    <section className="bg-white">
      <Container className="py-14">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Easy Steps To Build Your Resume
          </h2>
          <p className="mt-2 text-slate-600">
            Simple Steps to Craft a Professional Resume with Confidence and Ease
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center"
            >
              <div className="mx-auto h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-center text-xl">
                {s.icon}
              </div>
              <p className="mt-4 font-semibold text-slate-900">{s.title}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="h-10 bg-slate-50 border-t border-slate-100" />
    </section>
  );
}
