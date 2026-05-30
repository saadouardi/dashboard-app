function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white transition dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-slate-400">
        <p>Coding task by <a
          href="https://www.linkedin.com/in/saad-ouardi/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Saad Ouardi
        </a> · Dashboard
        </p>
      </div>
    </footer>
  )
}

export default Footer