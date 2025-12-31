import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold">CV Master</div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              CV Master helps you craft a resume that stands out with clean templates and guided writing.
            </p>
            <div className="mt-4 flex gap-2 text-slate-500">
              <span className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center">in</span>
              <span className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center">x</span>
              <span className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center">ig</span>
              <span className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center">f</span>
            </div>
          </div>

          <div>
            <p className="font-semibold">Site sections</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-slate-900" href="#about">About</a></li>
              <li><a className="hover:text-slate-900" href="#cv">CV</a></li>
              <li><a className="hover:text-slate-900" href="#resume">Resume</a></li>
              <li><a className="hover:text-slate-900" href="#cover">Cover Letter</a></li>
              <li><a className="hover:text-slate-900" href="#pricing">Pricing</a></li>
              <li><a className="hover:text-slate-900" href="#blog">Blog</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">Contact us</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>+0000000000</li>
              <li>info@yourmail.com</li>
              <li>WWW.example.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-slate-500">
          © CV Master. Designed and Developed by CV Master
        </div>
      </Container>
    </footer>
  );
}
