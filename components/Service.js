import { push, ref, remove } from "firebase/database";
import { auth, database } from "../firebase.js";
import Toast from 'react-native-root-toast';


let toast = "Toast message";

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
      toast = Toast.show(`Added ${item.title} to Wantlist`, {
        duration: Toast.durations.SHORT,
      });
      return true;
    case "collection":
      console.log(`Added to COLLECTION ${item.title}`);
      push(ref(database, "collection/"), itemToPush);
      toast = Toast.show(`Added ${item.title} to Collection`, {
        duration: Toast.durations.SHORT,
      });
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
      toast = Toast.show(`Deleted ${item.title} from Wantlist`, {
        duration: Toast.durations.SHORT,
      });
      break;
    case "collection":
      remove(ref(database, `collection/${item.key}`));
      toast = Toast.show(`Deleted ${item.title} from Collection`, {
        duration: Toast.durations.SHORT,
      });
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

