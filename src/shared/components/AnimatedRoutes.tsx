import { useContext } from "react"
import "antd/dist/antd.dark.less"
import "antd/dist/antd.less"
import "react-loading-skeleton/dist/skeleton.css"
import { AnimatePresence } from "framer-motion"
import { Routes, Route } from "react-router-dom"

import { Home, LandingPage, Login, MyProfile, MySessions } from "../../pages"
import { AppSkeleton, NotFound, PrivateRoute } from "../../shared/components"
import { ROUTES } from "../../shared/utils/constants"
import AuthContext from "../../shared/context/AuthContext"

const AnimatedRoutes = () => {
  const authContextData = useContext(AuthContext)

  return (
    <AnimatePresence>
      <Routes>
        <Route path={ROUTES.HOME} element={<AppSkeleton />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.DASHBOARD}>
            <Route
              path={ROUTES.HOME}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.MY_PROFILE}
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.MY_SESSIONS}
              element={
                <PrivateRoute>
                  <MySessions />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
