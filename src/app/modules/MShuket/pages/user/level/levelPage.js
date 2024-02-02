

import { UserLevelCart, UserLevelUIProvider, injectIntl,LevelPermission, useState } from './index'

function UserLevelPage(props) {
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
    <UserLevelUIProvider UIEvents={UIEvents}>
      <UserLevelCart />
      <LevelPermission edit={edit} setEdit={()=>setEdit(null)}/>
    </UserLevelUIProvider>
  );
}

export default injectIntl(UserLevelPage);
