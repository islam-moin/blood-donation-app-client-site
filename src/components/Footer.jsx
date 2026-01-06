export default function Footer() {
  return (
    <footer className="bg-red-600 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            BloodCare
          </h2>
          <p className="text-sm">
            A platform to connect blood donors and recipients.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Donation Requests</li>
            <li>Search Donors</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Support
          </h4>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Contact
          </h4>
          <p>📞 +880 1999991182</p>
          <p>📧 support@bloodcare.com</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-sm">
        © {new Date().getFullYear()} BloodCare. All rights reserved.
      </div>
    </footer>
  );
}
