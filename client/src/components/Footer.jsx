export default function Footer() {
  return (
    <div className="bg-slate-900 w-full">
      <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-white text-center w-full md:w-auto mb-2 md:mb-0">
          Auth App
        </h1>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start w-full md:w-auto">
          <p className="text-slate-300 text-center md:text-left w-full md:w-auto">
            Have a look:
          </p>
          <a
            href="https://github.com/mishaj-7"
            className="text-white hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mishaj-k-b195aa195/"
            className="text-white hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 text-white text-sm flex flex-wrap justify-between text-center md:text-left">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          &copy; 2024 Amstig Inc. All rights reserved.
        </div>
        <div className="w-full md:w-auto">
          Contact:{" "}
          <a href="mailto:amstig100@gmail.com" className="underline">
            amstig100@gmail.com
          </a>{" "}
          | Phone:{" "}
          <a href="tel:9645865551" className="underline">
            9645865551
          </a>
        </div>
      </div>
    </div>
  );
}
