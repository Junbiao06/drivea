const LeftSideBranding = () => {
  return (
    <div className="md:w-1/2 p-8 md:p-12 lg:p-16 bg-linear-to-br from-orange-50 via-zinc-100 to-red-50 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-between relative overflow-hidden">
      <div className='absolute inset-0 bg-[url("/pattern.svg")]' />
      <div className="relative z-10 flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="max-h-9" />
        <span className="text-4xl font-medium uppercase text-zinc-900">
          Drivea
        </span>
      </div>

      <div className="relative z-10 my-12 space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 leading-tight">
          Secure, simple & Fast
          <span className="text-orange-600">Cloud Storage</span>
        </h1>
        <p className="mt-2 text-zinc-700">
          A simple and secure cloud storage solution for your files.
        </p>
      </div>

      <div className="relative z-10 text-sm text-zinc-500">
        &copy; 2026 Junbiao. All rights reserved.
      </div>
    </div>
  );
};

export default LeftSideBranding;
