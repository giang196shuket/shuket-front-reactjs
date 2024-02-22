

import { NoticeAppCart, NoticeAppUIProvider, injectIntl } from './index'

function NoticeAppPage(props) {
  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      props.history.push(
        `/m-shuket/MOA SERVICE/service/NoticeApp-management/${id}/edit`
      );
    },
  };
  return (
    <NoticeAppUIProvider UIEvents={UIEvents}>
      <NoticeAppCart />
    </NoticeAppUIProvider>
  );
}

export default injectIntl(NoticeAppPage);
