import CreateForm from "../components/ScreensComp/CreateForm";
import { insertPlaceAsync } from "../util/database";


const AddPlaceScreen = ({ navigation }) => {
  const addPlaceHandler = async (place) => {
    await insertPlaceAsync(place)
    navigation.navigate("Start");
  };
  return <CreateForm addPlaceHandler={addPlaceHandler} />
};

export default AddPlaceScreen;