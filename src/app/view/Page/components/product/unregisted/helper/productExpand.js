import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import TagsInput from "react-tagsinput";
import {
  FormCheck,
  LinearProgress,
  editProduct,
  findMaxId,
  initailFilterImgProduct,
  keyTypeImage,
  keyTypeImageProductList,
  searchProductImages,
  toast,
  registerProduct
} from "../index";
import { useHistory } from "react-router-dom";

export const ProductExpand = ({ row }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { currentState } = useSelector(
    (state) => ({ currentState: state.product }),
    shallowEqual
  );
  const {
    editProductId,
  } = currentState;

  const [detail, setDetail] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [dataFind, setDataFind] = useState(initailFilterImgProduct);

  // cập nhập detail khi vừa expaned
  useEffect(() => {
    if (row) {
      setDetail(row);
    }
  }, [row]);

  // change name
  const  handleChangeName = (name) =>{
    setDetail({ ...detail, name: name });
  }
  // thêm xóa tag
  const handleChangeTag = (tages) => {
    setDetail({ ...detail, tags: tages });
  };

  console.log(detail)

  //find list image
  const handleFindImages = () => {
    setLoadingImage(true);
    dispatch(searchProductImages(dataFind))
      .unwrap()
      .then((res) => {
        setImages(res.data.list_images);
        setLoadingImage(false);
      })
      .catch((err) => {
        setLoadingImage(false);
      });
  };

  // thêm ảnh vào detail
  const handleAddImg = (img) => {
    const newImgList = [...detail.images];
    let newImg = {};
    if (newImgList.length === 0) {
      newImg = {
        thumb: img.img_url,
        priority: 1,
        main: 1,
        id: 1,
      };
    } else {
      newImg = {
        thumb: img.img_url,
        priority: findMaxId(newImgList, "priority") + 1,
        main: 0,
        id: findMaxId(newImgList, "id") + 1,
      };
    }
    newImgList.push(newImg);

    setDetail({ ...detail, images: newImgList });
  };

  // checked main
  const handleCheckMain = (img, checked) => {
    const main = checked ? 1 : 0;

    let newImgList = detail.images.map(function(im) {
      if (im.id === img.id) {
        return { ...im, main: main };
      } else {
        // chỉ 1 image duy nhất trong mảng detail.images có main = 1 => còn lại phải bằng 0
        if (main === 1) {
          return { ...im, main: 0 };
        } else {
          return im;
        }
      }
    });

    setDetail({ ...detail, images: newImgList });
  };

  // đổi thứ tự ưu tiên
  const handleChangePriority = (img, priority) => {
    let newImgList = detail.images.map(function(im) {
      if (im.id === img.id) {
        return { ...im, priority: priority };
      } else {
        return im;
      }
    });
    const newImgListArrange = newImgList.sort(
      (a, b) => a.priority - b.priority
    );
    setDetail({ ...detail, images: newImgListArrange });
  };

  // xóa ảnh trong detail
  const handleRemoveImg = (id) => {
    const newImgList = detail.images.filter((img) => img.id !== id);
    setDetail({ ...detail, images: newImgList });
  };


  const handleRegister = () =>{
    dispatch(registerProduct({name: detail.name, barcode: detail.barcode, images: detail.images, tags: detail.tags, code: detail.code}))
    .then((res)=>{
      // toast.success(res.payload.data)
      history.go(0)
    })
    .catch((err) =>{
      toast.error(err)
    })
  }
  return (
    <div className="my-5">
      <div className="row">
        <div className="col-lg-5 offset-md-1">
          <div className="row">
            <p className="col-lg-2 offset-md-1"> Name: </p>
            <input className="col-lg-9 form-control" defaultValue={row.name} onChange={(e)=>handleChangeName(e.target.value)} />
          </div>
          <div className="row my-5">
            <p className="col-lg-2 offset-md-1"> Tags: </p>
            <div className="col-lg-9 d-flex flex-column" style={{ gap: 10 }}>
              <TagsInput value={detail ? detail?.tags : []} onChange={handleChangeTag} />
            </div>
          </div>
          <div className="row">
            <p className="col-lg-2 offset-md-1"> Image: </p>
            {detail && detail?.images.length === 0 ? (
              <img
                style={{ width: "30%" }}
                src={row.noImage}
                alt=""
                className="col-lg-3"
              />
            ) : null}
            <div
              className="col-lg-9"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                maxHeight: 500,
                overflowY: "scroll",
                marginTop: 5,
              }}
            >
              {detail &&
                detail?.images.map((img, index) => {
                  return (
                    <div key={img.id}>
                      <div className="form-group row">
                        <div className="col-lg-5 mt-3">
                          <FormCheck
                            size="large"
                            type="checkbox"
                            id={img.main}
                            label={"Main"}
                            checked={img.main === 1 ? true : false}
                            onChange={(e) =>
                              handleCheckMain(img, e.target.checked)
                            }
                          />
                        </div>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          defaultValue={img.priority}
                          style={{ width: 50 }}
                          onChange={(e) =>
                            handleChangePriority(img, e.target.value)
                          }
                        />
                      </div>
                      <div className="d-flex flex-column" style={{ gap: 5 }}>
                        <img src={img.thumb} alt="" style={{ width: 130 }} />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveImg(img.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-md-1">
          <div className="form-group row">
            <div className="col-lg-3">
              <select
                className="form-control"
                placeholder="Filter by Image"
                name="img_cate"
                onChange={(e) => {
                  setDataFind({ ...dataFind, img_cate: e.target.value });
                }}
                value={dataFind.img_cate}
              >
                <option value="">All</option>
              </select>
              <small className="form-text text-muted">
                <b>Filter</b> by type
              </small>
            </div>
            <div className="col-lg-4">
              <select
                className="form-control"
                placeholder="Filter by Image"
                name="img_type"
                onChange={(e) => {
                  setDataFind({ ...dataFind, img_type: e.target.value });
                }}
                value={dataFind.img_type}
              >
                <option value="">All</option>
                {keyTypeImage.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                <b>Filter</b> by type image
              </small>
            </div>
            <div className="col-lg-5">
              <select
                className="form-control"
                placeholder="Filter by Image"
                name="img_keyword"
                onChange={(e) => {
                  setDataFind({ ...dataFind, img_keyword: e.target.value });
                }}
                value={dataFind.img_keyword}
              >
                <option value="">All</option>
                {keyTypeImageProductList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                <b>Filter</b> by type
              </small>
            </div>
          </div>
          <div className="form-group row">
            <input
              className="form-control col-lg-9"
              placeholder="search keyword images..."
              onChange={(e) =>
                setDataFind({ ...dataFind, img_value: e.target.value })
              }
            />
            <button
              type="submit"
              className="btn btn-success btn-sm col-lg-2 ml-1"
              onClick={handleFindImages}
            >
              FIND
            </button>
          </div>
          {loadingImage && <LinearProgress color="secondary" />}
          {images && (
            <div
              style={{
                maxHeight: 500,
                overflowY: "scroll",
                marginTop: 5,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {images?.map((img) => {
                return (
                  <div className="container-product">
                    <img
                      src={img.img_url}
                      loading="lazy"
                      class="image-product"
                      alt=""
                      style={{ width: 150, height: 150 }}
                    />
                    <div class="middle">
                      <div class="text" onClick={() => handleAddImg(img)}>
                        Add
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ gap: 10 }}>
        <button type="submit" className=" btn btn-light-primary font-weight-bolder font-size-sm" onClick={handleRegister}>
          REGISTER
        </button>
        <button className="btn btn-danger font-weight-bolder font-size-sm" onClick={()=>dispatch(editProduct(editProductId))}>
          Cancle
        </button>
      </div>
    </div>
  );
};
