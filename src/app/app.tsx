import React, { FunctionComponent } from 'react'

import { Advice } from '../widgets/advice'
import { SlicedPie } from '../widgets/sliced-pie'

import '../entities/layers-v2'

import styles from './app.module.css'

export const App: FunctionComponent = () => (
  <>
    <Advice className={styles.advice} />
    <SlicedPie />
  </>
)
