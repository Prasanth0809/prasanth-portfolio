import Link from '@/components/Link'

export default function Home() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">

      {/* Hero Section */}
      <div className="space-y-6 pt-6 pb-8 md:space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Prasanth Panneer Selvam
        </h1>

        <p className="text-xl text-gray-500 dark:text-gray-400">
          Azure Cloud Engineer specializing in designing secure and scalable
          Microsoft Azure infrastructure.
        </p>

        <div className="flex gap-4 pt-4">
          <Link
            href="/projects"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            View Projects
          </Link>

          <Link
            href="https://www.linkedin.com"
            className="rounded-lg border border-gray-400 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            LinkedIn
          </Link>
        </div>
      </div>

      {/* Skills Section */}
      <div className="pt-10 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Skills
        </h2>

        <ul className="mt-4 grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
          <li>Microsoft Azure</li>
          <li>Azure Virtual Machines</li>
          <li>Azure Storage Accounts</li>
          <li>Azure Networking</li>
          <li>RBAC & IAM</li>
          <li>Cloud Security</li>
          <li>Cost Optimization</li>
          <li>Infrastructure Automation</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="pt-10 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Contact
        </h2>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Feel free to connect with me on LinkedIn or explore my Azure projects.
        </p>
      </div>

    </div>
  )
}
