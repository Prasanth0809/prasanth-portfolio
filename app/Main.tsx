/* eslint-disable prettier/prettier */
import Link from 'next/link'
import Image from 'next/image'

export default function Main() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="pt-10 pb-10">

        {/* Hero Section */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src="/static/images/avatar.png"
            alt="Prasanth Panneer Selvam"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Open to Work
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Prasanth Panneer Selvam
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Azure Cloud Engineer specializing in secure cloud infrastructure and network security.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Microsoft Certified: Azure Fundamentals (AZ-900)
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/projects"
                className="rounded-lg bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-600"
              >
                View My Projects →
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Project */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Featured Project
          </h2>
          <div className="mt-4 rounded-xl border border-gray-200 p-6 dark:border-gray-700">
            <Link href="/blog/azure-secure-storage-architecture">
              <h3 className="text-lg font-semibold text-primary-500 hover:text-primary-600">
                Secure Azure Storage Architecture →
              </h3>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Designed a secure Azure Storage solution using Private Endpoints, RBAC, and
              Encryption to protect sensitive cloud data.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
