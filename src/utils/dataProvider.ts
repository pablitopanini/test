export interface IComment {
  author: string
  content: string
}

export interface IPost {
  title: string
  desc: string
  fullDesc: string
  id?: number
  comments?: IComment[]
}

export const editPost = (post: IPost) => {
  const posts: IPost[] = JSON.parse(localStorage.getItem('posts') || '[]')
  if (post.id && post.id >= 0) {
    const idx = posts.findIndex((p: IPost) => p.id === post.id)
    posts.splice(idx, 1, post)
  } else {
    posts.push({ ...post, id: posts.length + 1 })
  }
  localStorage.setItem('posts', JSON.stringify(posts))
}

export const getPosts = (current = 1, pageSize = 10) => {
  const allPosts = JSON.parse(localStorage.getItem('posts') || '[]')
  const posts = allPosts.slice(
    (current - 1) * pageSize,
    (current - 1) * pageSize + pageSize
  )
  return posts
}

export const getPostsCount = () => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  return posts.length
}

export const getPost = (id: string) => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  const post = posts.find((p: IPost) => p.id === parseInt(id))
  return post
}

export const removePost = (id: number) => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  const post = posts.findIndex((p: IPost) => p.id === id)
  posts.splice(post, 1)
  localStorage.setItem('posts', JSON.stringify(posts))
}
