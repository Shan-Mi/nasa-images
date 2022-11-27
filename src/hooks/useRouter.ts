import { useRouter as useNextRouter } from 'next/router'

const useRouter = () => {
  const router = useNextRouter()

  const SearchInputFromAsPath = router.asPath
    .replace('/search?', '')
    .split('&')
    .reduce(
      (acc, curr) => {
        return { ...acc, [curr.split('=')[0]]: curr.split('=')[1] }
      },
      { q: '', location: '', page: 1 }
    )
  return { router, SearchInputFromAsPath }
}

export default useRouter
