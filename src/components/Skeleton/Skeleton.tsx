import { Skeleton as MUISkeleton } from '@mui/material'

const Skeleton = ({ number = 8 }: { number?: number }): JSX.Element => {
  // @ts-ignore
  return [...Array(number).keys()].map((i) => (
    <MUISkeleton key={i} variant="rectangular" height={494} width={368} />
  ))
}
export default Skeleton
