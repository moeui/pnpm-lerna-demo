import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// import Layout from '@src/app/components/Layout'
import Home from '@src/app/pages/Home'
import NotFound from '@src/app/pages/NotFound'

import { urlPath } from './urlPath'

// const Page1 = lazy(() => import('@src/app/pages/Page1'))


const Comp = (): React.ReactElement => {
    return (
        // <Layout>
                    <Routes>
                        <Route>
                            <Route path={urlPath.home} element={<Home />} />
                            {/* <Route path={urlPath.page1} element={<Page1 />} /> */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
        // </Layout>
    )
}

export default Comp
