const UserLoadingSkeleton = () => {
  return (
    <div className="list-flex">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="list-container animate-pulse">
          <div className="list-card">
            <div className="list-image-container bg-slate-700" />
            <div className="flex-1">
              <div className="h-4 bg-slate-700 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLoadingSkeleton;
