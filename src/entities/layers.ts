import { sample } from 'lodash-es'

import { colorPalette } from '../shared/color-palette'

export interface Layer {
  title: string
  color: string
  slices?: Array<Slice>
}

export interface Slice {
  title: string
  color: string
}

export const layers = [{
  title: 'app',
  color: sample(colorPalette),
  slices: []
}, {
  title: 'processes',
  color: sample(colorPalette),
  slices: [{
    title: 'register',
    color: sample(colorPalette),
  }, {
    title: 'verify',
    color: sample(colorPalette),
  }, {
    title: 'checkout',
    color: sample(colorPalette),
  }]
}, {
  title: 'pages',
  color: sample(colorPalette),
  slices: [{
    title: 'login-or-auth',
    color: sample(colorPalette),
  }, {
    title: 'diary-id',
    color: sample(colorPalette),
  }, {
    title: 'product-id',
    color: sample(colorPalette),
  }]
}, {
  title: 'widgets',
  color: sample(colorPalette),
  slices: [{
    title: 'profile-card',
    color: sample(colorPalette),
  }, {
    title: 'feed',
    color: sample(colorPalette),
  }, {
    title: 'deal-banner',
    color: sample(colorPalette),
  }]
}, {
  title: 'features',
  color: sample(colorPalette),
  slices: [{
    title: 'auth-by-phone',
    color: sample(colorPalette),
  }, {
    title: 'inline-post',
    color: sample(colorPalette),
  }, {
    title: 'add-to-cart',
    color: sample(colorPalette),
  }]
}, {
  title: 'entities',
  color: sample(colorPalette),
  slices: [{
    title: 'user',
    color: sample(colorPalette),
  }, {
    title: 'diary',
    color: sample(colorPalette),
  }, {
    title: 'product',
    color: sample(colorPalette),
  }]
}, {
  title: 'shared',
  color: sample(colorPalette),
  slices: [{
    title: 'ui',
    color: sample(colorPalette),
  }, {
    title: 'lib',
    color: sample(colorPalette),
  }, {
    title: 'config',
    color: sample(colorPalette),
  }]
}]
