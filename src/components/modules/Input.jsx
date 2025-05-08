import styles from "./Input.module.css";

function Input({ name, register, errors, placeholder }) {
  return (
    <div className={styles.input}>
      <input
        type={name === "username" ? "text" : "password"}
        {...register(name)}
        placeholder={placeholder}
      />
      <span>{errors[name]?.message}</span>
    </div>
  );
}

export default Input;
