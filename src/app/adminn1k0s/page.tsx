import { getPrisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const prisma = getPrisma();
  
  // Fetch metrics
  const sessionCount = await prisma.session.count();
  const dialogueAgg = await prisma.dialogue.aggregate({
    _sum: {
      tokensUsed: true,
      costUsd: true,
    }
  });

  const totalTokens = dialogueAgg._sum.tokensUsed || 0;
  const totalCost = dialogueAgg._sum.costUsd ? Number(dialogueAgg._sum.costUsd) : 0;

  // Fetch recent sessions
  const recentSessions = await prisma.session.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { dialogues: true }
      }
    }
  });

  return (
    <main className="min-h-screen p-12 bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sophia Admin</h1>
            <p className="text-gray-500 text-sm font-medium">System Metrics & Overview</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
            <p className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm inline-block">
              admin@sophia.ai (Production)
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Sessions</h3>
            <p className="text-4xl font-extrabold mt-2 italic text-black">{sessionCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Tokens Used</h3>
            <p className="text-4xl font-extrabold mt-2 italic text-black">{totalTokens.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Estimated Cost</h3>
            <p className="text-4xl font-extrabold mt-2 italic text-black">
              <span className="text-gray-400 text-2xl mr-1 font-normal">$</span>
              {totalCost.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black tracking-tight uppercase">Recent Sessions</h2>
            <div className="h-1 w-20 bg-black"></div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 pt-2 text-xs font-black uppercase text-gray-400 tracking-widest">ID</th>
                  <th className="pb-4 pt-2 text-xs font-black uppercase text-gray-400 tracking-widest">Topic</th>
                  <th className="pb-4 pt-2 text-xs font-black uppercase text-gray-400 tracking-widest">Dialogue</th>
                  <th className="pb-4 pt-2 text-xs font-black uppercase text-gray-400 tracking-widest">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentSessions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400 text-sm font-medium">
                      No active sessions found.
                    </td>
                  </tr>
                ) : (
                  recentSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 text-xs font-mono text-gray-500">{session.id.slice(0, 8)}...</td>
                      <td className="py-4 font-bold text-sm tracking-tight">{session.topic || "N/A"}</td>
                      <td className="py-4">
                        <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold">
                          {session._count.dialogues} ROUNDS
                        </span>
                      </td>
                      <td className="py-4 text-xs text-gray-400 font-medium whitespace-nowrap">
                        {new Date(session.createdAt).toLocaleDateString()} {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
