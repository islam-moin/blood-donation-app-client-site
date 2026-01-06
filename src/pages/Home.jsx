import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* ================= Banner ================= */}
      <section className="bg-red-50 py-20 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Donate Blood, Save Lives
        </h1>
        <p className="mb-6 text-gray-600">
          Your blood can give someone a second chance
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Join as a Donor
          </Link>

          <Link
            to="/search"
            className="border border-red-600 text-red-600 px-6 py-2 rounded"
          >
            Search Donors
          </Link>
        </div>
      </section>

      {/* ================= Featured ================= */}
      <section className="py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        <div className="border p-6 rounded shadow">
          <h3 className="font-bold mb-2">Why Donate Blood?</h3>
          <p className="text-gray-600">
            One donation can save up to three lives.
          </p>
        </div>

        <div className="border p-6 rounded shadow">
          <h3 className="font-bold mb-2">How It Works</h3>
          <p className="text-gray-600">
            Register → Find Request → Donate → Save Life
          </p>
        </div>

        <div className="border p-6 rounded shadow">
          <h3 className="font-bold mb-2">Emergency Support</h3>
          <p className="text-gray-600">
            Quick blood access in emergency situations.
          </p>
        </div>
      </section>

      {/* ================= Contact ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Message"
              className="w-full border p-2 rounded"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Send Message
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            📞 +880 1999991183
          </p>
        </div>
      </section>
    </div>
  );
}
