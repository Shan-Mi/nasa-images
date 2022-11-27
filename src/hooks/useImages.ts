import { useEffect, useState } from 'react'

import { GenericReturnType, GetImagesByProp, Image } from '../type/type'

const RECENT = 'https://images-assets.nasa.gov/recent.json'
const POPULAR = 'https://images-assets.nasa.gov/popular.json'

const useImagesBy = ({
  type = 'recent',
}: GetImagesByProp): GenericReturnType => {
  const [images, setImages] = useState<Image[]>([] as Image[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const URL = type === 'recent' ? RECENT : POPULAR

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL)
        const json = await response.json()
        setLoading(false)

        const images = json.collection.items.filter(
          (item: Image) => item.data[0].media_type === 'image'
        )
        setImages(images)
      } catch (error: unknown) {
        setError(error)
      }
    }

    fetchData()
  }, [URL])

  return { images, loading, error } as const
}

export default useImagesBy
