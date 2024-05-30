export default function Footer() {
  return (
    <div className="bg-slate-900 w-full">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-white">Auth App</h1>
        <div className="flex gap-4">
          <p className="text-slate-300">Please have a look:</p>
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
      <div className="max-w-6xl mx-auto p-3 text-white text-sm flex justify-between">
        <div>&copy; 2024 Amstig Inc. All rights reserved.</div>
        <div>
          Contact:{" "}
          <a href="mailto:amstig100@gmail.com" className="underline">
            amstig100@gmail.com
          </a>{" "}
          | Phone:{" "}
          <a href="tel:+9645865551" className="underline">
            9645865551
          </a>
        </div>
      </div>
    </div>
  );
}
