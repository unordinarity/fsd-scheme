import invariant from 'tiny-invariant'

export const createPieVertices = (
  radius: number = 1,
  thetaFrom: number = 0,
  thetaTo: number = 2 * Math.PI,
  height: number = 1,
  circlePrecision: number = 100,
): Float32Array => {
  // secure checks

  invariant(radius > 0, 'createPieVertices: radius must be positive number')
  invariant(thetaTo > thetaFrom, 'createPieVertices: thetaTo must be higher than thetaFrom')
  invariant(height > 0, 'createPieVertices: height must be positive number')
  invariant(circlePrecision > 10, 'createPieVertices: height must be large positive number')

  // generate flat path

  const pathSections = Math.max(2, (thetaTo - thetaFrom) / (2 * Math.PI) * circlePrecision)
  const pathSectionStep = (thetaTo - thetaFrom) / pathSections

  const pathPoints = []
  pathPoints.push([0, 0])
  for(
    let theta = thetaFrom;
    theta < thetaTo;
    theta += Math.min(thetaTo - theta, pathSectionStep)
  ) {
    pathPoints.push([Math.cos(theta) * radius, Math.sin(theta) * radius])
  }
  pathPoints.push([Math.cos(thetaTo) * radius, Math.sin(thetaTo) * radius])
  pathPoints.push([0, 0])

  // transform flat path to vertices

  const vertices = []

  for(let i = 0; i < pathPoints.length - 1; i++) {
    const ix = pathPoints[i][0];
    const iz = pathPoints[i][1];
    const jx = pathPoints[i + 1][0];
    const jz = pathPoints[i + 1][1];

    // side
    vertices.push(ix, 0, iz)
    vertices.push(ix, height, iz)
    vertices.push(jx, height, jz)

    // top
    vertices.push(ix, height, iz)
    vertices.push(0, height, 0)
    vertices.push(jx, height, jz)

    // side
    vertices.push(jx, height, jz)
    vertices.push(jx, 0, jz)
    vertices.push(ix, 0, iz)

    // bottom
    vertices.push(ix, 0, iz)
    vertices.push(jx, 0, jz)
    vertices.push(0, 0, 0)
  }

  // ship it

  return Float32Array.from(vertices)
}
