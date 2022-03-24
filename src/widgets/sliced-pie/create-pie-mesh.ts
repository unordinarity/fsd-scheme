import { BufferAttribute, BufferGeometry, ColorRepresentation, Mesh, MeshBasicMaterial } from 'three'

import { createPieVertices } from './create-pie-vertices'

export const createPieMesh = (
  radius: number = 1,
  thetaFrom: number = 0,
  thetaTo: number = 2 * Math.PI,
  height: number = 1,
  color: ColorRepresentation = '#FFFFFF',
): Mesh => {
  const geometry = new BufferGeometry()
  const vertices = createPieVertices(radius, thetaFrom, thetaTo, height)
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  const material = new MeshBasicMaterial({ color: color })
  return new Mesh(geometry, material)
}
