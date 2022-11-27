import React from 'react'
import { Alert, Box, Paper, Typography } from '@mui/material'
import ImageCard from '../ImageCard/ImageCard'

import { ImageCardProp } from '../../type/type'
import styles from './SearchResults.module.css'

type SearchResultsProp = {
  items?: ImageCardProp[]
}

const SearchResults = ({ items }: SearchResultsProp): JSX.Element => {
  if (items?.length === 0)
    return (
      <Paper elevation={0}>
        <Alert severity="info">
          <Typography variant="body1">No search results were found</Typography>
          <Typography variant="caption">Please refine your query</Typography>
        </Alert>
      </Paper>
    )

  return (
    <Box className={styles.rightPanel}>
      {items?.map((item, i) => (
        <ImageCard item={item} key={i} />
      ))}
    </Box>
  )
}

export default SearchResults
