/* eslint-disable prettier/prettier */
export default function Main() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="pt-10 pb-10">

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Prasanth Panneer Selvam
        </h1>

        <p className="mt-2 text-green-400">
          Open to Azure Cloud Engineer opportunities
        </p>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Azure Cloud Engineer specializing in secure cloud infrastructure and network security.
        </p>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Microsoft Certified: Azure Fundamentals (AZ-900)
        </p>

        <div className="mt-6">
          <a
            href="/projects"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            View My Projects →
          </a>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Featured Project
          </h2>

          <div className="mt-6 rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold">
              <a
                href="/blog/azure-secure-storage-architecture"
                className="hover:text-pink-500"
              >
                Secure Azure Storage Architecture
              </a>
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Designed and implemented a secure Azure Storage architecture using Virtual Networks,
              Network Security Groups, Azure Monitor, and security validation through Microsoft
              Defender for Cloud.
            </p>

            <a
              href="/blog/azure-secure-storage-architecture"
              className="mt-4 inline-block text-pink-500 hover:underline"
            >
              Read Case Study →
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
