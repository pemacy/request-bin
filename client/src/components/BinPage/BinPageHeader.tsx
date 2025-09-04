const BinHeader = () => {
  return (
       <div className="grid grid-cols-6 rounded-xl bg-white p-4 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <span className="col-start-1">
          Home
        </span>
        
        <span className="col-start-4">
          Refresh
        </span>
        <span className="col-start-5">
          Del Reqs
        </span>
        <span className="col-start-6">
          Del Bin
        </span>
      </div>
  )
}

export default BinHeader