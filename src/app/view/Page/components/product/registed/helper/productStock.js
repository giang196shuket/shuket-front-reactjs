import React from 'react'
import { useDispatch } from 'react-redux';
import { productStockStatus, updateStockItem } from '../../../../redux/product/Thunk';

export const ProductStock = ({row}) => {
    const dispatch = useDispatch();

  return (
    <div>
    {row.is_pro_stock ? (
      <>
        <div className="d-flex flex-row justify-content-around align-items-center mb-5">
          <button
            className="btn btn-primary"
            disabled={row.min_stock === 0}
            onClick={() =>
              dispatch(
                updateStockItem({
                  min_stock: row.min_stock - 1,
                  p_code: row.code,
                  barcode: row.barcode,
                })
              )
            }
          >
            -
          </button>
          <p>{row.min_stock}</p>
          <button
            className="btn btn-primary"
            onClick={() =>
              dispatch(
                updateStockItem({
                  min_stock: row.min_stock + 1,
                  p_code: row.code,
                  barcode: row.barcode,
                })
              )
            }
          >
            +
          </button>
        </div>
        <button
          className="btn btn-light"
          onClick={() =>
            dispatch(
              productStockStatus({
                prd_seqs: [row.seq],
                is_pro_stock: row.is_pro_stock,
              })
            )
          }
        >
          OFF
        </button>
      </>
    ) : (
      <button
        className="btn btn-primary"
        onClick={() =>
          dispatch(
            productStockStatus({
              prd_seqs: [row.seq],
              is_pro_stock: row.is_pro_stock,
            })
          )
        }
      >
        ON
      </button>
    )}
  </div>
  )
}
