import React, { FunctionComponent, useMemo, useState } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

type Lang = 'ru' | 'en'

interface Props {
  className?: string
}

export const Advice: FunctionComponent<Props> = ({
  className
}) => {
  const [lang, setLang] = useState<Lang>('en')
  const text = useMemo(() => ({
    en: 'Imagine everything is a piece of cake.',
    ru: 'Ваш проект всё ещё торт.'
  }[lang]), [lang])

  return (
    <div
      className={clsx(styles.advice, className)}
      onClick={() => {
        setLang(prevState => prevState === 'ru' ? 'en' : 'ru')
      }}>
      {text}
    </div>
  )
}
