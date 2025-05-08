import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

import SigninForm from "components/templates/SigninForm";
import SignupForm from "components/templates/SignupForm";
import { userSchema } from "validation/userSchema";

function AuthPage() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onTouched",
  });

  return (
    <div>
      {step === 1 && (
        <SignupForm
          setStep={setStep}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
        />
      )}
      {step === 2 && (
        <SigninForm
          setStep={setStep}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          reset={reset}
        />
      )}
    </div>
  );
}

export default AuthPage;
