import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "context/userContext";
import Input from "components/modules/Input";
import { setCookie } from "utils/cookie";
import { signin } from "services/auth";

import styles from "./SignupForm.module.css";

function SigninForm({ setStep, register, handleSubmit, errors, reset }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const previousHandler = () => {
    setStep(1);
    reset();
  };

  const signinHandler = async (data) => {
    const result = await signin(data);
    if (result?.res?.token) {
      toast.success(`${data.username} خوش آمدید`);
      setCookie(result.res.token);
      setUser({ username: data.username, token: result.res.token });
      navigate("/");
      reset();
    } else if (result?.error?.status === 400) {
      toast.error("نام کاربری یا رمز عبور اشتباه است");
    } else {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    }

    console.log(result);
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>
      <form className={styles.form}>
        <img src="./logo.png" alt="logo" />
        <h2>فرم ورود</h2>
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
        </div>
        <button onClick={handleSubmit(signinHandler)}>ورود</button>
        <p>
          حساب کاربری ندارید؟<Link onClick={previousHandler}> ثبت نام</Link>
        </p>
      </form>
    </div>
  );
}

export default SigninForm;
