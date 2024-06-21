import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { test } from 'my'

const root = createRoot(document.getElementById('root')!)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
window.__build_info = __build_info

root.render(
    <div>{test}</div>
)
