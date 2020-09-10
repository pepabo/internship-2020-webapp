import Link from 'next/link'

type Props = {
  id: string
  title: string
  createdAt: string
}

export const ArticleListItem: React.FC<Props> = (props) => (
  <ul>
    <li>
      Title:{' '}
      <Link href="/articles/[id]" as={`/articles/${props.id}`}>
        <a>{props.title}</a>
      </Link>
    </li>
    <li>CreatedAt: {props.createdAt}</li>
  </ul>
)

