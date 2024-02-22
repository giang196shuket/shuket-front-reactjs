

import { UserAccountCart, UserAccountUIProvider, injectIntl,AccountPermission, useState } from './index'

function UserAccountPage(props) {
  const [edit, setEdit] = useState(null)

  const UIEvents = {
    openAdd: () => {
      props.history.push("/m-shuket/MOA SERVICE/service/sales-collection");
    },
    openEdit: (id) => {
      console.log('id', id)
      setEdit(id)
    },
  };
  return (
    <UserAccountUIProvider UIEvents={UIEvents}>
      <UserAccountCart />
      <AccountPermission edit={edit} setEdit={()=>setEdit(null)}/>
    </UserAccountUIProvider>
  );
}

export default injectIntl(UserAccountPage);
