'use client'

import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}

        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}

        <span>
          {currentPage} of {totalPages}
        </span>

        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}

        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>

        <div className="pt-6 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
            {title}
          </h1>
        </div>

        <ul>

          {displayPosts.map((post) => {

            const { path, date, title, summary } = post

            return (

              <li key={path} className="py-5">

                <article className="flex flex-col space-y-2">

                  <dl>

                    <dd className="text-base font-medium text-gray-500 dark:text-gray-400">

                      <time dateTime={date} suppressHydrationWarning>
                        {formatDate(date, siteMetadata.locale)}
                      </time>

                    </dd>

                  </dl>

                  <div className="space-y-3">

                    <h2 className="text-2xl font-bold tracking-tight">

                      <Link href={`/${path}`}>
                        {title}
                      </Link>

                    </h2>

                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>

                  </div>

                </article>

              </li>

            )

          })}

        </ul>

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}

      </div>
    </>
  )
}
