import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin" || process.env.ADMIN_USER_ID === userId;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center p-24 bg-gray-50 text-gray-900">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-sm text-center border border-red-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view the admin dashboard.</p>
          <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">Return Home</a>
        </div>
      </main>
    );
  }

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
            <p className="font-semibold">{user?.emailAddresses[0]?.emailAddress}</p>
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
