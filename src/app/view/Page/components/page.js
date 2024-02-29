import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { DashBoardPage } from "./DashBoardPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../module/layout";
import importPage from "./import/importPage";
import { MartEdit } from "./marts/mart/MartEdit";
import MartsPage from "./marts/mart/MartsPage";
import { FcmEdit } from "./fcm/fcm/fcmEdit";
import fcmPage from "./fcm/fcm/fcmPage";
import bannerCouponAdd from "./images/bannerCoupon/bannerCouponAdd";
import bannerCouponPage from "./images/bannerCoupon/bannerCouponPage";
import productBarcodePage from "./images/productBarcode/productBarcodePage";
import productNoBarcodePage from "./images/productNoBarcode/productNoBarcodePage";

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
import { MartAdd } from "./marts/mart/MartAdd";


export default function Page() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard */
          <Redirect exact={true} from="/m-shuket" to="/m-shuket/dashboard"/>
        }
        <ContentRoute path="/m-shuket/dashboard" component={DashBoardPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/sales-collection/:id/edit" component={MartEdit}/>
        <ContentRoute path="/m-shuket/MOA SERVICE/service/sales-collection/add" component={MartAdd} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/sales-collection" component={MartsPage} />

        <ContentRoute path="/m-shuket/MOA SERVICE/service/import-product" component={importPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/fcm-management/:id/edit" component={FcmEdit} />
        <ContentRoute path="/m-shuket/MOA SERVICE/service/fcm-management" component={fcmPage} />
        <ContentRoute path="/m-shuket/MARTS/app-management/app-builder/:id" component={AppBuilderEdit} />
        <ContentRoute path="/m-shuket/MARTS/app-management/app-builder" component={AppBuilderPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/marts/general-images/list/add" component={bannerCouponAdd} />

        <ContentRoute path="/m-shuket/MOA SERVICE/marts/general-images/list" component={bannerCouponPage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/marts/product-images-with-barcode/list" component={productBarcodePage} />
        <ContentRoute path="/m-shuket/MOA SERVICE/marts/product-images-without-barcode/list" component={productNoBarcodePage} />

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
