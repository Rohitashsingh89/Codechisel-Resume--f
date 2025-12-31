import Container from "./container";

const logos = ["slack", "netflix", "fitbit", "google", "uber", "airbnb"];

export default function LogoStrip() {
  return (
    <section className="bg-white border-y border-slate-100">
      <Container className="py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {logos.map((l) => (
            <div key={l} className="text-sm font-semibold tracking-wide text-slate-500">
              {l}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
