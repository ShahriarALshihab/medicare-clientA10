const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="font-body text-sm text-ink/60">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
