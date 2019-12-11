import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Input } from 'antd'
import { editPost, getPost, IPost } from '../utils/dataProvider'

function Page(props: RouteComponentProps) {
  const [title, setTitle] = React.useState<string>('')
  const [desc, setDesc] = React.useState<string>('')
  const [fullDesc, setFullDesc] = React.useState<string>('')
  const [id, setId] = React.useState<number>()
  const [post, setPost] = React.useState<IPost>()

  function save() {
    editPost({
      ...post,
      title,
      desc,
      fullDesc,
      id
    })
    props.history.goBack()
  }

  React.useEffect(() => {
    if (props.match.path === '/edit/:id') {
      const p = getPost(props.match.params['id'])
      setPost(p)
      setId(p.id)
      setTitle(p.title)
      setDesc(p.desc)
      setFullDesc(p.fullDesc)
    }
  }, [])

  return (
    <React.Fragment>
      <Button onClick={() => props.history.goBack()} icon="arrow-left" />
      <Input
        style={{ marginTop: 16 }}
        placeholder="Заголовок"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input.TextArea
        placeholder="Краткое описание"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        style={{ marginTop: 16 }}
      />
      <Input.TextArea
        placeholder="Полное описание"
        value={fullDesc}
        onChange={e => setFullDesc(e.target.value)}
        style={{ marginTop: 16 }}
      />
      <Button
        onClick={save}
        style={{ marginTop: 16 }}
        icon="save"
        disabled={!title || !desc || !fullDesc}
      />
    </React.Fragment>
  )
}

export default withRouter(Page)
