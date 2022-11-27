export type ImageData = {
  center: string
  title: string
  nasa_id: string
  date_created: string
  keywords?: string[]
  media_type: string
  secondary_creator?: string
  description: string
  description_508?: string
  photographer?: string
  album?: string[]
}
export type LinkData = {
  href: string
  rel: string
  render?: string
  prompt?: string
}

export type Image = {
  data: ImageData[]
  href: string
  links: LinkData[]
}

export type SearchResult = {
  href: string
  items: ImageData[]
  links: LinkData[]
  metadata: { total_hits: number }
  version: string
}

export type GenericReturnProp = {
  href: string
  items: ImageData[]
  version: string
}

export type GetImagesByProp = {
  type: ImagesType
}

export type ImagesType = 'recent' | 'popular'

export type GenericReturnType = {
  images: Image[]
  loading: boolean
  error: unknown
}

export type UseSearchProp = {
  q?: string
  location?: string
}

export type ImageCardProp = {
  data: ImageData[]
  href: string
  links: LinkData[]
}

export type ImageDataProp = {
  album: string[]
  center: string
  date_created: string
  keywords?: string[]
  media_type: string
  nasa_id: string
  description: string
  title: string
}

export type SearchResultsReturnType = {
  href: string
  items: Image[]
  metadata: { total_hits: number }
}
