import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteModal from "components/modules/DeleteModal";
import { useUser } from "context/UserContext";

import styles from "./Search.module.css";

function Search({ setQuery }) {
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showExitModal, setShowExitModal] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    JSON.parse(localStorage.getItem("data")).avatar || null;
  });

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

  const confirmHandler = () => {
    setUser({ username: "", token: "" });
    document.cookie = `token="";max-age=0`;
    setShowExitModal(false);
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
        {user.token ? (
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
            <button onClick={() => setShowExitModal(true)}>
              خروج از حساب کاربری
            </button>
          </div>
        ) : (
          <button
            className={styles.enterProfile}
            onClick={() => navigate("/auth")}
          >
            ورود به حساب کاربری
          </button>
        )}
      </div>
      {showExitModal && (
        <DeleteModal
          confirmHandler={confirmHandler}
          setShowExitModal={setShowExitModal}
        />
      )}
    </div>
  );
}

export default Search;
