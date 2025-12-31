import Container from "./container";
import Button from "./button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="font-semibold tracking-tight">CV Master</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a className="hover:text-slate-900" href="#home">Home</a>
            <a className="hover:text-slate-900" href="#about">About</a>
            <a className="hover:text-slate-900" href="#cv">CV</a>
            <a className="hover:text-slate-900" href="#resume">Resume</a>
            <a className="hover:text-slate-900" href="#cover">Cover Letter</a>
            <a className="hover:text-slate-900" href="#pricing">Pricing</a>
            <a className="hover:text-slate-900" href="#blog">Blog</a>
          </nav>
        </div>

        <Button href="/signup">Create account</Button>
      </Container>
    </header>
  );
}
