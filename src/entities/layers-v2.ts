import { colorPalette } from '../shared/color-palette'

// define databases

export enum LayerId {
  app,
  processes,
  pages,
  widgets,
  features,
  entities,
  shared
}

export interface LayerAttributes {
  title: string,
  description: string,
  color: string
}

export interface LayerRelations {
  slices: Array<SliceId>
}

export enum SliceId {
  checkout,
  verification,
  onboarding,

  authentication,
  diaryId,
  feed,
  cart,

  registerForm,
  loginForm,
  profileCard,
  diaryPreview,
  dealBanner,

  createDiary,
  searchProduct,

  user,
  diary,
  product,

  ui,
  api,
  config,
}

export interface SliceAttributes {
  title: string,
  description: string,
}

export interface SliceRelations {
  layer: LayerId,
  dependents: Array<SliceId>,
  dependencies: Array<SliceId>,
}

// fill databases with attributes and partial relations

export const layerData: Record<LayerId, LayerAttributes & Partial<LayerRelations>> = {
  [LayerId.app]: {
    title: 'App',
    description: 'Initializing application logic',
    color: colorPalette.rose,
  },
  [LayerId.processes]: {
    title: 'Processes',
    description: 'Application processes running over pages',
    color: colorPalette.ocean,
    slices: [SliceId.checkout, SliceId.verification, SliceId.onboarding]
  },
  [LayerId.pages]: {
    title: 'Pages',
    description: 'Application pages',
    color: colorPalette.mint,
    slices: [SliceId.authentication, SliceId.diaryId, SliceId.feed, SliceId.cart]
  },
  [LayerId.widgets]: {
    title: 'Widgets',
    description: 'Independent and self-contained blocks for pages',
    color: colorPalette.sakura,
    slices: [SliceId.registerForm, SliceId.loginForm, SliceId.profileCard, SliceId.diaryPreview, SliceId.dealBanner]
  },
  [LayerId.features]: {
    title: 'Features',
    description: 'Processing of user scenarios',
    color: colorPalette.iris,
    slices: [SliceId.createDiary, SliceId.searchProduct]
  },
  [LayerId.entities]: {
    title: 'Entities',
    description: 'Business entities that domain logic operates with',
    color: colorPalette.teal,
    slices: [SliceId.user, SliceId.diary, SliceId.product]
  },
  [LayerId.shared]: {
    title: 'Shared',
    description: 'Reused modules, non business specific',
    color: colorPalette.grass,
    slices: [SliceId.ui, SliceId.api, SliceId.config]
  }
}

export const sliceData: Record<SliceId, SliceAttributes & Partial<SliceRelations>> = {
  [SliceId.checkout]: {
    title: 'Checkout',
    description: 'Payment, delivery',
  },
  [SliceId.verification]: {
    title: 'Verification',
    description: 'KYC service',
  },
  [SliceId.onboarding]: {
    title: 'Onboarding',
    description: '',
  },

  [SliceId.authentication]: {
    title: 'Authentication',
    description: ''
  },
  [SliceId.diaryId]: {
    title: 'Diary Id',
    description: ''
  },
  [SliceId.feed]: {
    title: 'Feed',
    description: ''
  },
  [SliceId.cart]: {
    title: 'Cart',
    description: ''
  },

  [SliceId.registerForm]: {
    title: 'Register Form',
    description: ''
  },
  [SliceId.loginForm]: {
    title: 'Login Form',
    description: ''
  },
  [SliceId.profileCard]: {
    title: 'Profile card',
    description: ''
  },
  [SliceId.diaryPreview]: {
    title: 'Diary preview',
    description: ''
  },
  [SliceId.dealBanner]: {
    title: 'Deal banner',
    description: ''
  },

  [SliceId.createDiary]: {
    title: 'Create diary',
    description: ''
  },
  [SliceId.searchProduct]: {
    title: 'Search product',
    description: ''
  },

  [SliceId.user]: {
    title: 'User',
    description: ''
  },
  [SliceId.diary]: {
    title: 'Diary',
    description: ''
  },
  [SliceId.product]: {
    title: 'Product',
    description: ''
  },

  [SliceId.ui]: {
    title: 'UI',
    description: ''
  },
  [SliceId.api]: {
    title: 'API',
    description: ''
  },
  [SliceId.config]: {
    title: 'Config',
    description: ''
  },
}

// ensure there are relations fields

Object.entries(layerData).forEach(([_layerId, _layerData]) => {
  if (!_layerData.slices) _layerData.slices = []
})

Object.entries(sliceData).forEach(([_sliceId, _sliceData]) => {
  if (!_sliceData.dependents) _sliceData.dependents = []
  if (!_sliceData.dependencies) _sliceData.dependencies = []
})

// make all relations two-way

Object.entries(layerData).forEach(([_layerId, _layerData]) => {
  // Layer.slices (many) to (one) Slice.layer
  _layerData.slices?.forEach(_sliceId => {
    if (!sliceData[_sliceId].layer) {
      sliceData[_sliceId].layer = _layerId as unknown as LayerId
    } else if (sliceData[_sliceId].layer !== _layerId as unknown as LayerId) {
      throw new Error(`layer ${_layerId} and slice ${_sliceId} relations broken`)
    }
  })
})

Object.entries(sliceData).forEach(([_sliceId, _sliceData]) => {
  // Slice.layer (one) to (many) Layer.slices
  if (
    _sliceData.layer &&
    !layerData[_sliceData.layer].slices?.includes(_sliceId as unknown as SliceId)
  ) {
    layerData[_sliceData.layer].slices?.push(_sliceId as unknown as SliceId)
  }
  // Slice.dependents (many) to (many) Slice.dependencies
  _sliceData.dependents?.forEach(_otherSliceId => {
    if (!sliceData[_otherSliceId].dependencies?.includes(_sliceId as unknown as SliceId)) {
      sliceData[_otherSliceId].dependencies?.push(_sliceId as unknown as SliceId)
    }
  })
  // Slice.dependencies (many) to (many) Slice.dependents
  _sliceData.dependencies?.forEach(_otherSliceId => {
    if (!sliceData[_otherSliceId].dependents?.includes(_sliceId as unknown as SliceId)) {
      sliceData[_otherSliceId].dependents?.push(_sliceId as unknown as SliceId)
    }
  })
})

// check for empty relation fields

Object.entries(layerData).forEach(([_layerId, _layerData]) => {
  if (_layerData.slices?.length == 0) {
    console.warn(`layer "${_layerId}" has empty relation field "slices"`)
  }
})

Object.entries(sliceData).forEach(([_sliceId, _sliceData]) => {
  if (!_sliceData.layer) {
    console.warn(`slice ${_sliceId} has empty relation field "layer"`)
  }
  if (_sliceData.dependents?.length == 0)  {
    console.warn(`slice "${_sliceId}" has empty relation field "dependents"`)
  }
  if (!_sliceData.dependencies) {
    console.warn(`slice "${_sliceId}" has empty relation field "dependencies"`)
  }
})
