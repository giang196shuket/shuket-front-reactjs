import { editProductImage } from '../../../redux/images/Slice';
import { injectIntl, useDispatch } from './index'


import ProductBarcodeCart from "./productBarcodeCart";
import { ProductBarcodeUIProvider } from "./productBarcodeUIContext";
function ProductBarcodePage(props) {
  const dispatch = useDispatch();

  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/marts/general-images/list/add");
    },
    openEdit: (id) => {
     dispatch(editProductImage(id))
      
    },
  };
  return (
    <ProductBarcodeUIProvider UIEvents={UIEvents}>
      <ProductBarcodeCart />
    </ProductBarcodeUIProvider>
  );
}

export default injectIntl(ProductBarcodePage);
