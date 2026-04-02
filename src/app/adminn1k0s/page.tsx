export default async function AdminDashboard() {
  const isAdmin = true;

  return (
    <main className="min-h-screen p-12 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold">Sophia Admin</h1>
            <p className="text-gray-500">System Metrics & Overview</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Logged in as admin:</p>
            <p className="font-semibold">admin@sophia.ai (Production)</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Sessions</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Tokens Used</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Estimated Cost (USD)</h3>
            <p className="text-3xl font-bold mt-2">$0.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
          <div className="text-gray-500 text-sm italic">
            Database connection pending. Once connected, active sessions and dialogue stats will appear here.
          </div>
        </div>
      </div>
    </main>
  );
}
