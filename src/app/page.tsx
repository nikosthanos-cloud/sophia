import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Sophia AI</h1>
        <p className="text-xl text-center max-w-xl">
          Socratic Wisdom Platform. Talk to a sophisticated reasoning engine that helps you think clearly about your business.
        </p>

        <div className="flex gap-4 mt-8">
            <div className="flex gap-4 items-center">
              <Link href="/session" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Start New Session
              </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
