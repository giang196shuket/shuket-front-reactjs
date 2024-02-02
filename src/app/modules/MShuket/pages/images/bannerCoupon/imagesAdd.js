import { Card, CardBody, CardHeader, CardHeaderToolbar, ImageType, addImagesCouponBanner, getCatesImages, injectIntl, useDispatch, useEffect, useState } from './index'
function ImagesAdd(props) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [cate, setCate] = useState("");
  const [previews, setPreviews] = useState([]);
  const [ImageCategories,setImageCategories] = useState([])
  useEffect(() => {
    dispatch(getCatesImages())
      .unwrap()
      .then((res) => {
        if (res.code === 200 && res.status === "success") {
          setImageCategories(res.data.cate_images_list);
        }
      })
      .catch((err) => {});
  }, []);
  const handleImport = () => {
    dispatch(
      addImagesCouponBanner({
        bnr_status: "A",
        bnr_status_logic: "TRUE",
        image_cate: cate,
        image_type: type,
        is_set_mart: "C", //  A: TỰ ĐỘNG SET IMAGE NÀY CHO TẤT CẢ MART, C: KO
        muti_file: file,
      })
    )
      .unwrap()
      .then((res) => {
        setFile(null);
        setPreviews(null)
        setType(null)
        setCate(null)
      })
      .catch((err) => {});
  };

  const backToMartList = () => {
    props.history.push(`/m-shuket/MOA%20SERVICE/marts/general-images/list`);
  };
  const handlePreview = (files) => {
    const selectedFiles = files

    if (selectedFiles.length > 0) {
      // Read the contents of each selected file
      const readers = Array.from(selectedFiles).map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      // Set the image previews
      Promise.all(readers).then((results) => {
        setPreviews(results);
      });
    } else {
      // If no files are selected, reset the image previews
      setPreviews([]);
    }
  };
  console.log("file", file);
  console.log("previews", previews);

  return (
    <Card>
      <CardHeader title={"ADD IMAGES"}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToMartList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="row mb-5">
          <label className="col-form-label  col-lg-1 col-sm-12">
            Image type
          </label>
          <select
            className="form-control col-lg-2"
            name="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">--All--</option>
            {ImageType.map((type, index) => (
              <option key={index} value={type.code}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row mb-5">
          <label className="col-form-label  col-lg-1 col-sm-12">
            Image category
          </label>
          <select
            className="form-control col-lg-2"
            name="cate"
            value={cate}
            onChange={(e) => {
              setCate(e.target.value);
            }}
          >
            <option value="">--All--</option>
            {ImageCategories.map((cate, index) => (
              <option key={index} value={cate.cate_code}>
                {cate.cate_name_en}
              </option>
            ))}
          </select>
        </div>
        <div className="row mb-5">
          <label className="col-form-label  col-lg-1 col-sm-12">
            Upload images :
          </label>
          <input
            className="form-control form-control-sm col-lg-2 col-sm-12"
            type="file"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              // eslint-disable-next-line no-lone-blocks
              {
                setFile(e.target.files);
                handlePreview(e.target.files);
              }
            }}
          />
        </div>
        <div className="row">
          {previews ? (
            previews.map(preview => {
              return (
                <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "150px", margin:20 }}
              />
              )
            })
           
          ):null}
        </div>
        <button
          onClick={handleImport}
          type="button"
          className="btn btn-primary col-form-label  mt-5"
        >
          Add new
        </button>
      </CardBody>
    </Card>
  );
}

export default injectIntl(ImagesAdd);
