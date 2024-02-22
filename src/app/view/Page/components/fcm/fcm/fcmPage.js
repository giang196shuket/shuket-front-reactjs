

import { FcmCart, FcmUIProvider, injectIntl } from './index'

function FcmPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/fcm-management/${id}/edit`
      );
    },
  };
  return (
    <FcmUIProvider UIEvents={UIEvents}>
      <FcmCart />
    </FcmUIProvider>
  );
}

export default injectIntl(FcmPage);
