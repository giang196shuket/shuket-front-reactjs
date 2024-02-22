import { injectIntl } from './index'


import ProductBarcodeCart from "./productBarcodeCart";
import { ProductBarcodeUIProvider } from "./productBarcodeUIContext";
function ProductBarcodePage(props) {
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
    <ProductBarcodeUIProvider UIEvents={UIEvents}>
      <ProductBarcodeCart />
    </ProductBarcodeUIProvider>
  );
}

export default injectIntl(ProductBarcodePage);
