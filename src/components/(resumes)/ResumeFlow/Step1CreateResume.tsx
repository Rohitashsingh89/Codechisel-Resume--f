interface Step1Props {
  onNext: (data: any) => void;
}

export default function Step1CreateResume({ onNext }: Step1Props) {
  return (
    <>
      {/* <div className="w-full px-4 lg:w-1/2">
        <div className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0" data-wow-delay=".15s">
          <Image
            src="/images/resume-preview.png"
            alt="Resume preview"
            fill
            className="drop-shadow-three dark:hidden dark:drop-shadow-none rounded-2xl object-cover"
          />
        </div>
      </div> */}
      <div className="w-full">
        <div className="max-w-[470px]">
          <div className="mb-9">
            <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
              Create Resume
            </h3>
            <p className="text-body-color text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
              Select from professionally designed templates. Fill your details and get ATS-optimized resume instantly.
            </p>
          </div>
          
          <div className="mb-9">
            <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
              Quick 3-Step Process
            </h3>
            <ul className="text-body-color text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed space-y-2">
              <li>• Choose Template → Fill Details → Download PDF</li>
              <li>• 100% ATS Compatible</li>
              <li>• Mobile Responsive Preview</li>
            </ul>
          </div>
          
          <button
            onClick={() => onNext({ template: "modern", name: "John Doe" })}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
          >
            Continue to Choose Plan →
          </button>
          
          <p className="text-body-color text-sm text-center">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </>
  );
}
