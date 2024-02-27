import { editProductNoBarcodeImage } from '../../../redux/images/Slice';
import { injectIntl, useDispatch } from './index'

import ProductNoBarcodeCart from "./productNoBarcodeCart";
import { ProductNoBarcodeUIProvider } from "./productNoBarcodeUIContext";
function ProductNoBarcodePage(props) {
  const dispatch = useDispatch();

  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/marts/general-images/list/add");
    },
    openEdit: (id) => {
      dispatch(editProductNoBarcodeImage(id))

    },
  };
  return (
    <ProductNoBarcodeUIProvider UIEvents={UIEvents}>
      <ProductNoBarcodeCart />
    </ProductNoBarcodeUIProvider>
  );
}

export default injectIntl(ProductNoBarcodePage);
