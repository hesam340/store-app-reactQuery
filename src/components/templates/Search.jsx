import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.css";
import { useUser } from "context/UserContext";

function Search({ setQuery }) {
  const { user, setUser } = useUser();
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showExitProfile, setShowExitProfile] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const search = searchParams.get("name");

  useEffect(() => {
    setSearchText(search);
  }, []);

  useEffect(() => {
    setUser((user) => ({ ...user, avatar }));
  }, [avatar]);

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const enterHandler = (e) => {
    if (e.key === "Enter" || e.target.tagName === "IMG") {
      setQuery((query) => {
        const newQuery = { ...query, page: 1 };

        if (searchText !== "") {
          newQuery.name = searchText.trim();
        } else {
          delete newQuery.name;
        }

        return newQuery;
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <img src="./search.svg" alt="search" onClick={enterHandler} />
        <input
          type="text"
          placeholder="جستجو در نام کالا"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={enterHandler}
        />
      </div>
      <div className={styles.profile}>
        {!showExitProfile ? (
          <button
            className={styles.enterProfile}
            onClick={() => setShowExitProfile(true)}
          >
            ورود به حساب کاربری
          </button>
        ) : (
          <div className={styles.exitProfile}>
            <div>
              <img src={user.avatar || "./profile.svg"} alt="avatar" />
              <label htmlFor="avatar">+</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={imageHandler}
              />
            </div>
            <p>{user.username}</p>
            <button>خروج از حساب کاربری</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
