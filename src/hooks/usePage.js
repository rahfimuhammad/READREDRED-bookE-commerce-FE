import { useState } from "react"

export const usePage = () => {

    const [page, setPage] = useState(1)

    const nextPage = () => {
        setPage(page + 1)
        window.scrollTo(0, 0)
      }

    const prevPage = () => {
        setPage(page - 1)
        window.scrollTo(0, 0)
      }

    return {
        nextPage: nextPage,
        prevPage: prevPage,
        page
    }

}
