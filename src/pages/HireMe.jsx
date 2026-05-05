import { Link } from "react-router-dom";

const HireMe = () => {
  return (
    <div className="min-h-screen px-6 pt-24 pb-16 bg-slate-950 text-white">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Hire Me 👨‍💻
        </h1>

        <p className="text-gray-400 mt-4">
          I am a passionate Full Stack MERN Developer who builds modern, fast, and responsive web applications.
        </p>
      </div>

      {/* Skills */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">

        <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✔ React.js / Next.js</li>
            <li>✔ Node.js / Express.js</li>
            <li>✔ MongoDB / MySQL</li>
            <li>✔ Tailwind CSS / UI Design</li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-semibold mb-4">What I Do</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✔ Full Stack Web Development</li>
            <li>✔ API Development</li>
            <li>✔ Responsive UI Design</li>
            <li>✔ Portfolio / Business Websites</li>
          </ul>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold">
          Let’s build something amazing 🚀
        </h3>

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/contact"
            className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Contact Me
          </Link>

          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 border border-gray-500 rounded-lg font-medium hover:border-white transition"
          >
            Download CV
          </a>
        </div>
      </div>

    </div>
  );
};

export default HireMe;