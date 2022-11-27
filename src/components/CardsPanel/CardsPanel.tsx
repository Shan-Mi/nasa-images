import React from 'react'
import { Box } from '@mui/material'
import CardsList from '../CardsList/CardsList'
import { GetImagesByProp } from '../../type/type'

import styles from './CardsPanel.module.css'

const CardsPanel = ({ type }: GetImagesByProp) => {
  return (
    <Box className={styles.rightPannel}>
      <CardsList type={type} />
    </Box>
  )
}

export default CardsPanel
