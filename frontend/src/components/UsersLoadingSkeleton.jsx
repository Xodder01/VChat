function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-slate-100 dark:bg-slate-800/40 p-4 rounded-xl animate-pulse border border-slate-200/60 dark:border-slate-700/40">
          <div className="flex items-center space-x-3">
            <div className="size-11 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200/70 dark:bg-slate-700/70 rounded-md w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;
