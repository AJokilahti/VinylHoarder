import { push, ref, remove } from "firebase/database";
import { auth, database } from "../firebase.js";

const addTo = (item, destination) => {
  
  if (!item) return false;

  const itemToPush = {
    title: item.title,
    thumb: item.thumb,
    user: auth.currentUser.uid,
  };

  switch (destination) {
    case "wantlist":
      console.log(`Added to WANTLIST ${item.title}`);
      push(ref(database, "wantlist/"), itemToPush);
      return true;
    case "collection":
      console.log(`Added to COLLECTION ${item.title}`);
      push(ref(database, "collection/"), itemToPush);
      return true;
    default:
      return false;
  }
};

const deleteFrom = (item, destination) => {
  if (!item) return;

  switch (destination) {
    case "wantlist":
      remove(ref(database, `wantlist/${item.key}`));
      break;
    case "collection":
      remove(ref(database, `collection/${item.key}`));
      break;
    default:
      return;
  }
};

const validateValues = (snapshot) => {
  if (!snapshot) return [];

  const data = snapshot.val();

  if (!data) return [];

  const keys = Object.keys(data);
  const values = Object.values(data);
  const newItems = [];
  for (const i in keys) {
    newItems.push({
      ...values[i], // [0:itemImg,itemTitle,User:KEY]
      key: keys[i],
    });
  }
  return newItems;
};

export { addTo, deleteFrom, validateValues };

