
import { useState } from 'react';
import {Button, Modal, ProductUnregisterCart, ProductUnregisterUIProvider, injectIntl, useDispatch } from './index'
import { editProduct } from '../../../redux/product/Slice';


function ProductUnregisterPage(props) {
  const dispatch = useDispatch();

  const UIEvents = {
    openEdit: (id) => {
      dispatch(editProduct(id))   
    },
  };
  return (
    <>

      <ProductUnregisterUIProvider UIEvents={UIEvents}>
      <ProductUnregisterCart />
    </ProductUnregisterUIProvider>
    </>

   
  );
}

export default injectIntl(ProductUnregisterPage);
