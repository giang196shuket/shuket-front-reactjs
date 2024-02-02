import { injectIntl } from './index'


import ImagesCart from "./imagesCart";
import { ImagesUIProvider } from "./imagesUIContext";
function ImagesPage(props) {
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
    <ImagesUIProvider UIEvents={UIEvents}>
      <ImagesCart />
    </ImagesUIProvider>
  );
}

export default injectIntl(ImagesPage);
