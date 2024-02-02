import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ShuketDashBoardPage } from "./ShuketDashBoardPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../services/layout";
import importPage from "./import/importPage";
import { MartEdit } from "./marts/mart/MartEdit";
import MartsPage from "./marts/mart/MartsPage";
import { FcmEdit } from "./fcm/fcm/fcmEdit";
import fcmPage from "./fcm/fcm/fcmPage";
import imagesAdd from "./images/bannerCoupon/imagesAdd";
import imagesPage from "./images/bannerCoupon/imagesPage";
import areaPage from "./delivery/area/areaPage";
import { AppBuilderPage } from "./appBuilder/appBuilderPage";
import { AppBuilderEdit } from "./appBuilder/appBuilderEdit";
import productPage from "./product/registed/productPage";
import accountPage from "./user/account/accountPage";
import catalogPage from "./catalog/catalog/catalogPage";
import levelPage from "./user/level/levelPage";
import noticeMoaPage from "./notice/moa/moaPage";
import noticeAppPage from "./notice/app/appPage";
import orderPage from "./order/order/orderPage";


export default function ShuketManagementPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard */
          <Redirect exact={true} from="/m-shuket" to="/m-shuket/dashboard"/>
        }
        <ContentRoute path="/m-shuket/dashboard" component={ShuketDashBoardPage} />
        {/* <ContentRoute path="/m-shuket/marts/new" component={ProductEdit} /> */}
        <ContentRoute path="/m-shuket/MOA SERVICE/service/sales-collection/:id/edit" component={MartEdit}/>
        <ContentRoute path="/m-shuket/MOA SERVICE/service/sales-collection" component={MartsPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/import-product" component={importPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/fcm-management/:id/edit" component={FcmEdit} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/fcm-management" component={fcmPage} />
        <ContentRoute path="/m-shuket/MARTS/app-management/app-builder/:id" component={AppBuilderEdit} />
        <ContentRoute path="/m-shuket/MARTS/app-management/app-builder" component={AppBuilderPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/marts/general-images/list/add" component={imagesAdd} />

        <ContentRoute path="/m-shuket/MOA SERVICE/marts/general-images/list" component={imagesPage} />
        <ContentRoute path="/m-shuket/MARTS/marts/delivery/list-address" component={areaPage} />
        <ContentRoute path="/m-shuket/MARTS/marts/product/registered-list" component={productPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/admin/account/list" component={accountPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/admin/account/level" component={levelPage} />

        <ContentRoute path="/m-shuket/MOA SERVICE/admin/catalogs/list" component={catalogPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/moa/moa-notice" component={noticeMoaPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/moa/moa-notice-messages" component={noticeAppPage} />
        <ContentRoute path="/m-shuket/MARTS/marts/order/list" component={orderPage} />


      </Switch>
    </Suspense>
  );
}
