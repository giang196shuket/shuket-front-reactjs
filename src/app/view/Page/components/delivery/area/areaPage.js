
import { AreaCart, AreaUIProvider, injectIntl, setAdd, useDispatch } from './index'

function AreaPage(props) {
  const dispatch = useDispatch();

  const UIEvents = {
    openAdd: (value) => {
      dispatch(setAdd(value))
    },
    openEdit: (id) => {
      props.history.push(
        `/m-shuket/MOA SERVICE/service/fcm-management/${id}/edit`
      );
    },
  };
  return (
    <AreaUIProvider UIEvents={UIEvents}>
      <AreaCart />
    </AreaUIProvider>
  );
}

export default injectIntl(AreaPage);
