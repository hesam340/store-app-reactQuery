import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "components/modules/Input";
import { signup } from "services/auth";

import styles from "./SignupForm.module.css";

function SignupForm({ setStep, register, handleSubmit, errors, reset }) {
  const nextHandler = () => {
    setStep(2);
    reset();
  };

  const signupHandler = async (data) => {
    const result = await signup(data);
    if (result?.res?.message) {
      toast.success("اطلاعات کاربر با موفقیت ذخیره شد");
      setStep(2);
      reset();
    } else if (result?.error?.status === 400) {
      toast.error("کاربر با این اطلاعات قبلا ثبت نام کرده است");
    } else {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>
      <form className={styles.form}>
        <img src="./logo.png" alt="logo" />
        <h2>فرم ثبت نام</h2>
        <div className={styles.inputs}>
          <Input
            name="username"
            register={register}
            errors={errors}
            placeholder="نام کاربری"
          />
          <Input
            name="password"
            register={register}
            errors={errors}
            placeholder="رمز عبور"
          />
          <Input
            name="rePassword"
            register={register}
            errors={errors}
            placeholder="تکرار رمز عبور"
          />
        </div>
        <button onClick={handleSubmit(signupHandler)}>ثبت نام</button>
        <p>
          حساب کاربری دارید؟<Link onClick={nextHandler}> ورود</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
