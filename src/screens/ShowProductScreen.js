//Home Screen Trainingg
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, CheckBox } from 'react-native-elements'
import { MediaComponent } from '../components/MediaComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen-hooks';
import { SliderBox } from 'react-native-image-slider-box'
import { categoryList, imageSliderr } from '../data/Data'
import { olahragaList, imageSlider } from '../data/DataFreeTraining';
import realm from '../../store/realm';

const ShowProductScreen = (props) => {
  const { navigation } = props
  const [data,setData] = useState([])
  const [final, setFinal] = useState([])

  useEffect(() => {
    setData(realm.objects('Training'));
    const training = data
    const final = [...training].sort((a, b) => b.id - a.id)
    const newData = final.map((item) => {
        item.checkedStatus = false
        return item
    })
    setFinal(newData)
}, []);

  return (
    <View style={styles.mainContainer}>
      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderBoxHeight={200}
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('TrainingScreen', { trainingId: item.id })}>
            <View style={styles.trainingContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.image }}
              />

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>{item.date}</Text>
              </View>
            </View>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <Text>Belum Olahraga</Text>
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton} onPress={() => navigation.navigate('EditProduct')}
        >
          <Icon
            name="plus"
            type="antdesign"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShowProductScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //warna background
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  addButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 100
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center'
  },
  trainingContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius:100
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    color: 'black',
    fontSize: 16
  },
})