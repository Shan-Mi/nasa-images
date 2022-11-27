import React from 'react'

import ImageCard from '../ImageCard/ImageCard'
import useImagesBy from '../../hooks/useImages'
import { GetImagesByProp } from '../../type/type'
import Skeleton from '../Skeleton/Skeleton'

const CardsList = ({ type }: GetImagesByProp): JSX.Element => {
  const { images, loading, error } = useImagesBy({ type })

  if (loading) return <Skeleton />

  if (error) return <div>error: {JSON.stringify(error)}</div>

  return (
    <>
      {images?.map((item, i) => (
        <ImageCard item={item} key={i} />
      ))}
    </>
  )
}

export default CardsList
