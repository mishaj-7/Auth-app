
export default function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        Welcom to mishaj Auth App!
      </h1>
      <p className="mb-4 text-slate-700">
        This is full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authenctication features
        that allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated user.
      </p>
      <p className="mb-4 text-slate-700">
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end built with Node.js and
        Express, and uses MongoDB as the Database. Authentication is implemented
        suing JSON Web Token(JWT).
      </p>
      <p className="mb-4 text-slate-700">
        This application for production purpouses of full stack web application
        with authentication using MERN stack. Feel free to use it as a template for
        you own crative ideas.
      </p>
    </div>
  );
};
