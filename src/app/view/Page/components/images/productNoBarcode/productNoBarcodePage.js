import { injectIntl } from './index'


import ProductNoBarcodeCart from "./productNoBarcodeCart";
import { ProductNoBarcodeUIProvider } from "./productNoBarcodeUIContext";
function ProductNoBarcodePage(props) {
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
    <ProductNoBarcodeUIProvider UIEvents={UIEvents}>
      <ProductNoBarcodeCart />
    </ProductNoBarcodeUIProvider>
  );
}

export default injectIntl(ProductNoBarcodePage);
