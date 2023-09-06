import { ScrollView, TextInput, View, Text } from "react-native"
import { useCallback, useState } from "react";

import ImagePicker from "./ImagePicker";
import LocationPicker from "../places/LocationPicker";
import Button from "../ui/Button";
import Place from "../../models/Place";

const CreateForm = ({ addPlaceHandler }) => {

  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const titleHandler = (text) => {
    setTitle(text);
  };

  const imageHandler = (uri) => {
    setImage(uri);
  };

  const locationHandler = useCallback((locationInfo) => {
    setLocation(locationInfo);
  }, []);


  const submitHandler = () => {
    const place = new Place(title, image, location);
    addPlaceHandler(place);
  };

  return (
    <ScrollView>
      <View>
        <Text>Title</Text>
        <TextInput onChangeText={titleHandler} value={title} />
      </View>
      <ImagePicker imageHandler={imageHandler} />
      <LocationPicker locationHandler={locationHandler} />
      <Button onPress={submitHandler}> Save </Button>
    </ScrollView>
  )
};

export default CreateForm;