export interface RafWrapper {
  start: () => void
  stop: () => void
}

export interface RafWrapperOptions {}

export const createRafWrapper = (
  cb: FrameRequestCallback,
  options: RafWrapperOptions = {}
): RafWrapper => {
  let isRunning: boolean = false
  let rafId: number | null = null

  const realFrameCb = (time: DOMHighResTimeStamp) => {
    cb(time)
    if (isRunning) requestAnimationFrame(realFrameCb)
  }

  const start = () => {
    isRunning = true
    rafId = requestAnimationFrame(realFrameCb)
  }

  const stop = () => {
    if (isRunning) {
      isRunning = false
      cancelAnimationFrame(rafId as number)
    }
  }

  return {
    start,
    stop
  }
}
