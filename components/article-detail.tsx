export const ArticleDetail: React.FC<{ title: string; body: string; createdAt: string }> = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <pre>{props.body}</pre>
      <pre>投稿日時: {props.createdAt}</pre>
    </div>
  )
}
