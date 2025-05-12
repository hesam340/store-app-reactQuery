import { number, object, ref } from "yup";

const priceSchema = object({
  minPrice: number()
    .required()
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .typeError("لطفا فقط عدد وارد کنید")
    .positive("مقدار را به درستی وارد کنید"),
  maxPrice: number()
    .required()
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .typeError("لطفا فقط عدد وارد کنید")
    .positive("مقدار را به درستی وارد کنید")
    .moreThan(ref("minPrice"), "حداکثر قیمت باید بیشتر از حداقل قیمت باشد"),
});

export default priceSchema;
