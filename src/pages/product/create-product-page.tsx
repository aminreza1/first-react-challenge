import { useContext, useState } from "react";
import { HttpService } from "../../services/http-service";
import { useNavigate } from "react-router-dom";
import { CreateProductDTO } from "../../dtos/product/create-product-dto";
import { AuthContext } from "../../contexts/auth-context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type CreateProductPageProps = {};

const CreateProductPage: React.FC<CreateProductPageProps> = ({}) => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    qty: 0,
  } as CreateProductDTO);

  const numberRegexPattern: RegExp = /^[0-9\b]+$/;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    HttpService.post("products", product)
      .then((resp) => {
        console.log(resp);
        navigate("/products");
      })
      .catch((err) => {
        alert(`افزودن محصول جدید با خطا مواجه شد ${err.statusCode}`);
        console.log(err);
      });
  };

  if (!authCtx.authData.isAuth)
    return (
      <div className="flex">
        <div role="alert" className="alert alert-warning">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-5 h-5"/>
          <span>شما مجوز استفاده از این صفحه را ندارید.</span>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col">
        <h1 className="text-xl">ایجاد محصول جدید</h1>
        <form className="flex flex-col mx-2 my-4 gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center w-[400px]">
            <label htmlFor="title">عنوان محصول :</label>
            <input
              type="text"
              name="title"
             
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              placeholder="لطفا عنوان محصول را وارد نمایید"
              className="border rounded-lg ms-2 flex-auto py-2 px-4"
            />
          </div>
          <div className="flex items-center w-[400px]">
            <label htmlFor="price">قیمت فروش :</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={(e) => {
                if (e.target.value === "") setProduct({ ...product, price: 0 });
                if (numberRegexPattern.test(e.target.value))
                  setProduct({ ...product, price: parseInt(e.target.value) });
              }}
              className="border rounded-lg ms-2 flex-auto py-2 px-4"
            />
          </div>
          <div className="flex items-center w-[400px]">
            <label htmlFor="qty">تعداد موجودی انبار :</label>
            <input
              type="text"
              name="qty"
              value={product.qty}
              onChange={(e) => {
                if (e.target.value === "") setProduct({ ...product, qty: 0 });
                if (numberRegexPattern.test(e.target.value))
                  setProduct({ ...product, qty: parseInt(e.target.value) });
              }}
              className="border rounded-lg ms-2 flex-auto py-2 px-4"
            />
          </div>
          <div className="flex items-center w-[400px] gap-3 justify-end">
            <button
              type="button"
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-600 "
            >
              بازگشت به لیست محصولات
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-800 rounded-md text-blue-50 "
            >
              ذخیره محصول
            </button>
          </div>
        </form>
      </div>
    );
};

export default CreateProductPage;
