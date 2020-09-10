import { FormEvent, ChangeEvent } from 'react'

export const ArticleEditor: React.FC<{
  onSubmit: (e: FormEvent) => void
  title: { value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
  body: { value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
  mode: 'new' | 'edit'
}> = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <label>タイトル:</label>
        <input type="text" name="title" value={props.title.value} onChange={props.title.onChange} />
        <br />
        <label>本文:</label>
        <br />
        <textarea value={props.body.value} onChange={props.body.onChange} />
        <br />
        <button type="submit">{props.mode === 'new' ? '投稿する' : '保存する'}</button>
      </form>
    </div>
  )
}
