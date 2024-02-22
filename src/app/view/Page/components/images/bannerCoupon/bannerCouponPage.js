import { injectIntl } from './index'


import BannerCouponCart from "./bannerCouponCart";
import { BannerCouponUIProvider } from "./bannerCouponUIContext";
function BannerCouponPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/marts/general-images/list/add");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/fcm-management/${id}/edit`
      );
    },
  };
  return (
    <BannerCouponUIProvider UIEvents={UIEvents}>
      <BannerCouponCart />
    </BannerCouponUIProvider>
  );
}

export default injectIntl(BannerCouponPage);
