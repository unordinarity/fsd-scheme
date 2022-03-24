import React, { FunctionComponent, MouseEventHandler, useEffect, useMemo, useRef } from 'react'
import clsx from 'clsx'
import { Mesh, PerspectiveCamera, Scene, Vec2, WebGLRenderer } from 'three'

import { layers } from '../../entities/layers'
import { createRafWrapper } from '../../shared/raf-wrapper'

import { createPieMesh } from './create-pie-mesh'
import styles from './styles.module.css'

interface Props {
  className?: string,
}

export const SlicedPie: FunctionComponent<Props> = ({
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const meshes: Array<Mesh> = useMemo(() => {
    const meshes: Array<Mesh> = []

    layers.forEach((layer, index) => {
      const layerArcs = layer.slices.map((slice, index, list) => ({
        color: slice.color,
        from: (index - layer.slices.length / 2) * 0.1 * (Math.PI * 2),
        to: (index - layer.slices.length / 2 + 1) * 0.1 * (Math.PI * 2),
      }))

      if (layerArcs.length > 0) {
        layerArcs.push({
          color: layer.color,
          from: layerArcs[layerArcs.length - 1]?.to - Math.PI * 2,
          to: layerArcs[0]?.from,
        })
      } else {
        layerArcs.push({
          color: layer.color,
          from: 0,
          to: Math.PI * 2,
        })
      }

      layerArcs.forEach(arc => {
        const mesh = createPieMesh(4, arc.from, arc.to, 1, arc.color)
        meshes.push(mesh)
        mesh.geometry.translate(0, index, 0)
      })
    })

    return meshes
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasNode = canvasRef.current
    const canvasRect = canvasNode.getBoundingClientRect()

    // three setup

    let scene = new Scene()

    let camera = new PerspectiveCamera(70, canvasRect.width / canvasRect.height, 0.1, 1000)

    let mousePos: Vec2 = { x: 0, y: 0 }
    const mouseMoveHandler = (event: MouseEvent) => {
      mousePos = {
        x: (event.x / canvasRect.width) * 2 - 1,
        y: (event.y / canvasRect.height) * 2 - 1,
      }
    }
    canvasNode.addEventListener('mousemove', mouseMoveHandler)

    let renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvasRef.current
    })
    renderer.setSize(canvasRect.width, canvasRect.height)

    // load meshes

    meshes.forEach(mesh => {
      scene.add(mesh)
    })

    // start render

    const rafWrapper = createRafWrapper((time) => {
      camera.position.set(
        Math.cos(-1 * mousePos.x * Math.PI * 0.5) * 10,
        5.5 + Math.sin(-1 * mousePos.y * Math.PI * 0.5) * 5,
        Math.sin(-1 * mousePos.x * Math.PI * 0.5) * 10
      )
      camera.lookAt(0, 3.5, 0)

      renderer.render(scene, camera)
    }, {})

    rafWrapper.start()

    // stop processes

    return () => {
      canvasNode.removeEventListener('mousemove', mouseMoveHandler)
      rafWrapper.stop()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={clsx(styles.canvas, className)}
    />
  )
}
