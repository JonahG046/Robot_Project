import "./Home.css"



const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🤖 Welcome to Robobite
        </h1>
        <p className="text-gray-600 text-lg">
          Classroom & Office Messaging Robot Portal
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full space-y-8">
        
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            What is Robobite?
          </h2>
          <p className="text-gray-600">
            Robobite is an automated delivery robot designed to transport 
            messages between classrooms and offices. 
            This portal allows users to submit delivery requests, 
            monitor activity, and manage system settings.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Features
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <li className="bg-gray-50 p-3 rounded-lg shadow-sm">
              📨 Send Delivery Requests
            </li>
            <li className="bg-gray-50 p-3 rounded-lg shadow-sm">
              📍 Track Robot Location
            </li>
            <li className="bg-gray-50 p-3 rounded-lg shadow-sm">
              📋 View Delivery History
            </li>
            <li className="bg-gray-50 p-3 rounded-lg shadow-sm">
              ⚙️ Manage Settings (Admin)
            </li>
          </ul>
        </section>

        {/* CTA Buttons */}
         <section className="flex justify-center pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
              Send Message
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition">
              Check Status
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Robobite System
      </div>
    </div>
  );
};

export default Home;
