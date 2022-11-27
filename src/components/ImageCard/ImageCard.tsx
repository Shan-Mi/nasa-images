import React from 'react'
import Link from 'next/link'
import { Paper, CardContent, Typography, Box, Chip } from '@mui/material'
import { formatDate } from '../../lib/dayjs'
import { ImageCardProp as ImageCardItemProp } from '../../type/type'

import styles from './ImageCard.module.css'

type ImageCardProp = {
  item: ImageCardItemProp
}

const ImageCard = ({ item: { data, links } }: ImageCardProp): JSX.Element => {
  const {
    center,
    date_created,
    description,
    title,
    nasa_id,
    keywords = [],
  } = data[0]

  return (
    <Paper square={false} elevation={0} className={styles.paperWrapper}>
      <Link href={`/details/${nasa_id}`}>
        <img src={links[0].href} alt={description} className={styles.image} />
        <CardContent className={styles.cardContentWrapper}>
          <Typography
            variant="subtitle2"
            component="h2"
            className={styles.subtitle}>
            {`${center} • ${formatDate(date_created)}`}
          </Typography>
          <Typography variant="h5" component="h5" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="body2" className={styles.bodyText}>
            {description}
          </Typography>
          <Box sx={{ flex: '1 1 0' }} />
          {keywords.length > 0 && (
            <Box className={styles.keywordsWrapper}>
              {keywords.map((keyword, i) => (
                <Chip
                  label={keyword}
                  key={`${keyword}-${i}`}
                  sx={{ color: '#3f51b5', backgroundColor: '#e8eaf6' }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Link>
    </Paper>
  )
}

export default ImageCard
