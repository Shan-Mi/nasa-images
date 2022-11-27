import React from 'react'
import Layout from '../src/components/Layout/Layout'
import SearchResults from '../src/components/SearchResults/SearchResults'

const Search = () => {
  return (
    <Layout showSearchResults>
      <SearchResults />
    </Layout>
  )
}

export default Search
