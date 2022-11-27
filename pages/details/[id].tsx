import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useRouter from '../../src/hooks/useRouter'
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  Paper,
  CardContent,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { formatDate, isValid } from '../../src/lib/dayjs'
import styles from './details.module.css'
import { Image } from '../../src/type/type'

const Details = () => {
  const router = useRouter()
  const nasaId = router.router.query?.id
  const [value, setValue] = useState(0)
  const [imgSrc, setImgSrc] = useState('')
  const [metaData, setMetaData] = useState({} as Record<string, string>)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [showExifData, setShowExifData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (nasaId) {
        try {
          const response = await fetch(
            `https://images-api.nasa.gov/metadata/${nasaId}`
          )
          const res2 = await fetch(
            `https://images-api.nasa.gov/asset/${nasaId}`
          )

          const json = await response.json()
          const asset = await res2.json()

          const imageSrc = asset.collection.items.find((item: Image) =>
            item.href.includes('medium')
          )
          setImgSrc(imageSrc?.href)

          const obj = await (await fetch(json.location)).json()
          setLoading(false)
          setMetaData(obj)
        } catch (error: unknown) {
          setError(error)
        }
      }
    }

    fetchData()
  }, [nasaId])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setShowExifData(newValue === 1)
  }

  if (!metaData || error) return null

  const date = metaData['AVAIL:DateCreated']

  const dateCreated = isValid(date)
    ? formatDate(metaData['AVAIL:DateCreated'])
    : metaData['AVAIL:DateCreated']
  const center = metaData['AVAIL:Center']
  const title = metaData['AVAIL:Title']
  const description = metaData['AVAIL:Description']
  const keywords = (metaData['AVAIL:Keywords'] || []) as string[]
  const album = metaData['AVAIL:Album']

  const refinedData = {
    'AVAIL:Center': center,
    'AVAIL:Album': album,
    'AVAIL:Title': title,
    'AVAIL:NASAID': nasaId,
    'AVAIL:Description': description,
    'AVAIL:Keywords': keywords,
    'AVAIL:DateCreated': dateCreated,
  }

  return (
    <Box>
      <Box className={styles.headerContainer}>
        <Container>
          <nav className={styles.navWrapper}>
            <div className={styles.navHomeLink}>
              <Link href="/">
                <HomeIcon fontSize="inherit" />
                NASA Image Explorer
              </Link>
            </div>

            <div className={styles.navTitle}>{title}</div>
          </nav>
          <Box sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <Typography variant="h4">
              {loading ? <Skeleton /> : title}
            </Typography>
          </Box>
          <Box className={styles.headerInfoWrapper}>
            <Box className={styles.headerInfoItemWrapper}>
              <InfoIcon fontSize="inherit" sx={{ marginRight: '4px' }} />
              <p>{nasaId}</p>
            </Box>
            <Box className={styles.headerInfoItemWrapper}>
              <HomeIcon fontSize="inherit" sx={{ marginRight: '4px' }} />
              <p>{center}</p>
            </Box>
            <Box className={styles.headerInfoItemWrapper}>
              <CalendarMonthOutlinedIcon
                fontSize="inherit"
                sx={{ marginRight: '4px' }}
              />
              <p>{dateCreated}</p>
            </Box>
          </Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="tabs for newest and popular images">
              <Tab label="image" />
              <Tab label="exif data" />
            </Tabs>
          </Box>
        </Container>
      </Box>
      <Container sx={{ maxWidth: '1152px' }}>
        <Box sx={{ paddingTop: '24px', paddingBottom: '80px' }}>
          <Paper sx={{ overflow: 'hidden' }}>
            {showExifData ? (
              <Paper>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Key</TableCell>
                      <TableCell>value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(refinedData)?.map(([key, value]) => (
                      <TableRow
                        key={key}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}>
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                }}>
                <Box sx={{ minWidth: '50%' }}>
                  {loading ? (
                    <Skeleton
                      sx={{ width: '100%', height: '100%', minHeight: '423px' }}
                      variant="rectangular"
                    />
                  ) : (
                    <img
                      src={imgSrc}
                      alt={description}
                      className={styles.image}
                    />
                  )}
                </Box>
                <Box sx={{ minWidth: '50%' }}>
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      component="h2"
                      className={styles.subtitle}>
                      {loading ? <Skeleton /> : `${center} • ${dateCreated}`}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h5"
                      className={styles.title}>
                      {loading ? <Skeleton /> : title}
                    </Typography>
                    <Typography variant="body2" className={styles.bodyText}>
                      {loading ? <Skeleton height={200} /> : description}
                    </Typography>

                    {keywords.length > 0 && (
                      <Box className={styles.keywordsWrapper}>
                        {keywords.map((keyword, i) => (
                          <Chip
                            label={keyword}
                            key={`${keyword}-${i}`}
                            sx={{
                              color: '#3f51b5',
                              backgroundColor: '#e8eaf6',
                              margin: '0 8px 8px 0',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default Details
