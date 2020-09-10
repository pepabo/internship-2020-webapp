type Article = {
    title: string
    body: string
    date: string
}

export const BlogBox = () => {
    const articles: Article[] = [
        { title: 'タイトル', body: 'イーハトーヴォのあの透き通った風', date: '2000-01-01T00:00:00Z' },
        { title: 'タイトル', body: 'イーハトーヴォのあの透き通った風', date: '2000-01-01T00:00:00Z' },
        { title: 'タイトル', body: 'イーハトーヴォのあの透き通った風', date: '2000-01-01T00:00:00Z' },
    ]

    const items = articles.map((v) => (
        <div>
            <h1>{v.title}</h1>
            <h2>{v.body}</h2>
            <span>{v.date}</span>
            <br></br>
            ______________________________________________________________________
        </div>
    ))

    return (
        <div>
            {items}
        </div>
    )
}