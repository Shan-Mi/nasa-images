import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  Button,
  Paper,
  Grid,
  Divider,
  Box,
  Typography,
  TextField,
  Tab,
  Tabs,
  Pagination,
} from '@mui/material'

import { Container } from '@mui/system'
import { ImagesType, SearchResultsReturnType } from '../../type/type'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import useRouter from '../../hooks/useRouter'

import styles from './Layout.module.css'
import Link from 'next/link'
import NoSSR from '../NoSSR/NoSSR'

type LayoutProp = {
  showSearchResults?: boolean
  showPopularPanel?: boolean
  children: JSX.Element
}

const Layout = ({
  showSearchResults = false,
  showPopularPanel = false,
  children,
}: LayoutProp): JSX.Element => {
  const { router, SearchInputFromAsPath } = useRouter()

  const [_type, setType] = useState<ImagesType>('recent')
  const [value, setValue] = useState(showPopularPanel ? 1 : 0)
  const [collection, setCollection] = useState<SearchResultsReturnType>(
    {} as SearchResultsReturnType
  )
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(collection?.metadata?.total_hits / 100) || 0

  const [searchInput, setSearchInput] = useState(SearchInputFromAsPath.q ?? '')
  const [locationInput, setLocationInput] = useState(
    SearchInputFromAsPath.location ?? ''
  )

  useEffect(() => {
    if (SearchInputFromAsPath.q) {
      getImages(page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SearchInputFromAsPath.q, page])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)

    if (newValue === 0) {
      router.push('/')
      setType('recent')
      return
    }
    if (newValue === 1) {
      router.push('/popular')
      setType('popular')
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    router.push(
      `/search?q=${searchInput}&location=${locationInput}&page=${page}`
    )
    getImages()
  }

  const getImages = (page = 1) => {
    fetch(
      `https://images-api.nasa.gov/search?q=${searchInput}&location=${locationInput}&&media_type=image&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setCollection(data.collection as SearchResultsReturnType))
  }

  const handleClick = () => {
    router.replace('/')
    setSearchInput('')
    setLocationInput('')
  }

  const handleOnChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          paddingTop: '64px',
          paddingBottom: '80px',
        }}>
        <Link href={'/'}>
          <Typography variant="h5" component="h1" mb={3}>
            NASA Image Explorer
          </Typography>
        </Link>

        <Divider />

        <Box
          sx={{
            paddingTop: '24px',
          }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ maxWidth: '368px' }}>
                <NoSSR>
                  <Paper elevation={0}>
                    <form className={styles.searchForm} onSubmit={handleSubmit}>
                      <TextField
                        label="Search"
                        name="search"
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value)
                        }}
                      />
                      <TextField
                        label="Location"
                        name="location"
                        value={locationInput}
                        onChange={(e) => {
                          setLocationInput(e.target.value)
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!searchInput && !locationInput}>
                        Search
                      </Button>
                    </form>
                  </Paper>
                </NoSSR>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ width: '100%' }}>
                {showSearchResults ? (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h5"
                        mb={3}
                        sx={{
                          margin: 0,
                          fontWeight: 400,
                        }}>
                        Search results
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h6"
                        mb={3}
                        sx={{
                          margin: 0,
                          fontSize: '1rem',
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 400,
                        }}>
                        {collection?.metadata?.total_hits ?? 0} results found
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}>
                        <ArrowBackIosIcon fontSize="medium" />
                        Home
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="tabs for newest and popular images">
                      <Tab label="Newest" />
                      <Tab label="popular" />
                    </Tabs>
                  </Box>
                )}
                {React.cloneElement(children, { items: collection.items })}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '24px',
                  }}>
                  <Pagination count={totalPages} onChange={handleOnChange} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Layout
