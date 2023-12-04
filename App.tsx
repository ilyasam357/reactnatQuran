// In App.js in a new project

import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();

function App() {
  const [data, setData] = useState<any>([]);

  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
   
    fetch('https://equran.id/api/surat')
      .then(response => response.json())
      .then(data => setDatas(data));
  }, []);

  const HandleSurah = () => {
    const [isLoadingSurah, setIsLoadingSurah] = useState(true);
    useEffect(() => {
      // Set isLoading to false when data is loaded
      setIsLoadingSurah(false);
    }, []);
    return (
      <ScrollView>
        <View>
          {isLoadingSurah ? (
            <Text style={{ textAlign: 'center' , fontWeight: 'bold' , color: 'black', marginTop: 50}}>Loading...</Text>
          ) : (
            <View>
              {data?.ayat?.map((item: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => getHandlePerSurat(item.nomor)}
                    key={item.nomor}>
                    <View style={styles.contentBody}>
                      <Text style={{fontWeight: 'bold', color: 'black'}}>
                        {item.ar}
                      </Text>
                      <Text style={{fontSize: 16}} >{item.nomor} {item.idn}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  const getHandlePerSurat = (diambilDariId:string) => {
    
    fetch(`https://equran.id/api/surat/${diambilDariId}`)
      .then(response => response.json())
      .then(data => setData(data));
  };
  const HandleListSurah = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Set isLoading to false when data is loaded
      setIsLoading(false);
    }, []);
    return (
      <ScrollView>
        <View>
        {isLoading ? (
          <Text style={{ textAlign: 'center' , fontWeight: 'bold' , color: 'black', marginTop: 50}}>Loading...</Text>
        ) : (
          datas?.map((data: any) => (
            <View style={styles.contentBody} key={data.nomor}>
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(true);
                  getHandlePerSurat(data.nomor);
                }}
              >
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  {data.nama}
                </Text>
                <Text>{data.nama_latin}</Text>
                <Text>{data.arti}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        </View>
      </ScrollView>
    );
  };

  const HandleJus = () => {
    return (
      <ScrollView>
        <View>
          <Text>helo </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen
          name={isOpen ? `Surat ${data?.nama_latin}` : 'Daftar Surat'}
          component={isOpen ? HandleSurah : HandleListSurah}
          listeners={{
            tabPress: event => {
              setIsOpen(false);
            },
          }}
          options={{
            tabBarIcon: ({focused}) => (
              <Ionicons name={isOpen ? 'book' : 'list' } size={22} color="green" />
            ),
          }}
        />
        <Tab.Screen name="Jus" component={HandleJus} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  contentBody: {
    margin: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
};

export default App;

//  <Icon name="home" size={22} color="green" />