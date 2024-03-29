import Image from 'next/image'
import Markdown from 'react-markdown'
import { getGhostBlogsBySlug } from '@/app/ghost/blogBySlug'


const Blog = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const blog = await getGhostBlogsBySlug(slug)

  if (!blog) return null
  return (
    <main className="flex h-full flex-col items-center justify-center bg-white">
      <section className="flex w-full   max-w-4xl flex-col items-center justify-center bg-white p-4 shadow-md md:p-8">
        {blog.feature_image &&
          <figure className="mb-2 flex w-full max-w-[800px] flex-col overflow-hidden">
            <Image
              src={blog.feature_image}
              alt="Descripción de la imagen"
              height={1080}
              width={1920}
              className="m-4 w-full object-cover"
            />
          </figure>
        }

        <h3 className="m-4 text-xl font-semibold md:m-6 md:text-3xl">{blog.title}</h3>

        <article className="prose prose-sm md:prose-lg lg:prose-xl prose-headings:underline prose-h1:text-xl prose-a:text-blue-600 w-full">
          {blog.html &&
            <div dangerouslySetInnerHTML={{ __html: blog.html }} />
          }
        </article>
      </section>
    </main>
  )
}

export default Blog
