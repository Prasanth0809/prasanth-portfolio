import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Case Studies' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(
    sortPosts(allBlogs).filter(
      (post) =>
        post.title !== 'Secure Azure Storage Architecture' &&
        !post.draft
    )
  )
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Case Studies"
    />
  )
}
```

This will hide CloudGuard from page 1. Then also update the tag className in `ListLayoutWithTags.tsx` from:
```
className="text-xs font-medium uppercase tracking-wide text-pink-500 dark:text-pink-400"
```
To:
```
className="mr-3 text-sm font-medium uppercase text-pink-500 dark:text-pink-400"
