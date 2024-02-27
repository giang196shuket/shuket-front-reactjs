import { injectIntl, useDispatch } from './index'
import {  toast } from 'react-toastify';
import BannerCouponCart from "./bannerCouponCart";
import { BannerCouponUIProvider } from "./bannerCouponUIContext";
import { updateBannerStatusImgs } from '../../../redux/images/Thunk';
import { useHistory } from "react-router-dom";

function BannerCouponPage(props) {
  const dispatch = useDispatch();
  const history = useHistory()

  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/marts/general-images/list/add");
    },
    openDelete: (id) => {
      try {
        dispatch(
          updateBannerStatusImgs({
            code: id,
            status:'D',
          })
        ).then((res)=>{
          toast.success(res.payload.data)
          history.go(0)
        })
      } catch (error) {
        toast.error(error)
      }
   
    },
  };
  return (
    <BannerCouponUIProvider UIEvents={UIEvents}>
      <BannerCouponCart />
    </BannerCouponUIProvider>
  );
}

export default injectIntl(BannerCouponPage);
