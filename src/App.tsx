function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-600">Mini Dashboard App</p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          React Product Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          A clean React + TypeScript dashboard application using native fetch,
          React Router, Tailwind CSS, search, filtering, loading states and
          responsive design.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Tailwind is working correctly.
        </div>
      </section>
    </main>
  )
}

export default App