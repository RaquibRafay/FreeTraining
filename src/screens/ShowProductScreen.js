import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { MediaComponent } from '../components/MediaComponent';
import realm from '../../store/realm'

const ShowProductScreen = (props) => {
  const { navigation } = props
  const { route } = props
  const [data, setData] = useState([])
  const [isBuy, setIsBuy] = useState(false);
  const category = route.params

  const collectData = () => {
    const allData = realm.objects('Product').filtered(`category = ${tes}`)
    setData(allData)
  }

  useEffect(() => {
    console.log(data)
    const productPage = navigation.addListener('focus', () => {
      collectData()
    })
    return productPage
  })

  const [contact, setContact] = useState({
    phoneNumber: '',
    instagram: '',
    facebook: ''
  });

  const buyProduct = (whatsapp, instagramId, facebookId) => {
    setContact({
      phoneNumber: whatsapp,
      instagram: instagramId,
      facebook: facebookId
    });
    setIsBuy(true);
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.itemButton}>
              <View style={styles.productContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.imagePath }}
                />

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.productName}</Text>
                  <Text style={styles.text}>{item.description}</Text>
                  <Text style={styles.text}> ${item.price}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => buyProduct(item.phoneNumber, item.instagram, item.facebook)}>
                <Icon
                  name="shoppingcart"
                  type="antdesign"
                  size={30}
                />
              </TouchableOpacity>

            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View style={styles.noItem}>
            <Text>
              No items.
            </Text>
          </View>
        }
      />
      {
        isBuy ?
          <View style={styles.modalContainer}>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setIsBuy(false)}
              >
                <Icon
                  name="close"
                  type="antdesign"
                  size={18}
                />
              </TouchableOpacity>
              <Text style={[styles.sellerText, styles.title]}>
                Contact the seller through this media :
              </Text>
              {
                contact.phoneNumber !== '' ?
                  <MediaComponent
                    source={require('../../assets/images/whatsapp.png')}
                    value={contact.phoneNumber}
                  />
                  :
                  null
              }
              {
                contact.instagram !== '' ?
                  <MediaComponent
                    source={require('../../assets/images/instagram.png')}
                    value={contact.instagram}
                  />
                  :
                  null
              }
              {
                contact.facebook !== '' ?
                  <MediaComponent
                    source={require('../../assets/images/facebook.png')}
                    value={contact.facebook}
                  />
                  :
                  null
              }
            </View>
          </View>
          :
          null
      }

    </View>
  )
}

export default ShowProductScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  flatListContainer: {
    padding: 8
  },
  itemButton: {
    margin: 8,
    padding: 16,
    borderColor: '#7CAF58',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    width: 100,
    height: 100
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center'
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
  noItem: {
    alignItems: 'center',
    margin: 8
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center'
  },
  cancel: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8
  },
  sellerText: {
    marginBottom: 8,
    marginTop: 32
  }
});