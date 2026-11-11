import { Image, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid';
import * as Location from "expo-location";
import Categories from "../../components/Categories";
import FeatureRow from "../../components/FeatureRow";
import { useEffect, useState } from "react";
import client from '../../sanity';

export default function HomeScreen() {

  const [features, setFeatures] = useState<any[]>([]);
  const [locationName, setLocationName] = useState("Current Location");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationName("Location denied");
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync(position.coords);
      if (place) {
        const name = [place.street, place.city].filter(Boolean).join(", ");
        setLocationName(name || place.region || "Unknown location");
      }
    } catch {
      setLocationName("Location unavailable");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(()=>{
    client.fetch(`
      *[_type == 'feature']{
        ...,
        restaurants[]-> {
          ...,
          dishes[]->
        }
      }
    `).then((data)=>{
      setFeatures(data);
    })
  },[]);

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center pb-2 mx-4 space-x-1 px-4">
        <Image 
          source={require('../../assets/images/avatar.png')}
          className="h-16 w-16 p-4 rounded-full bg-gray-200"
        />
        <TouchableOpacity className="flex-1" onPress={getLocation}>
          <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl" numberOfLines={1}>
            {locationName}
            <ChevronDownIcon size={16} color='#000'/>
          </Text>
        </TouchableOpacity>
        <UserIcon size={24} color='#16c47f'/>
      </View>
      
      {/* Search */}
      <View className="flex-row items-center mx-2 px-4">
        <View className="flex-1 flex-row items-center space-x-2 mx-1 px-2 bg-gray-300">
          <MagnifyingGlassIcon size={20} color='#16c47f' />
          <TextInput placeholder="Restaurants And cuisins"
          keyboardType="default"
          value={searchText}
          onChangeText={setSearchText}
          className="w-80"/>
        </View>
        <AdjustmentsVerticalIcon color='#16c47f'/>
      </View>

      {/* Body */}
      <ScrollView className="bg-gray-200"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{paddingBottom:100}}>

        <Categories
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {features?.map((feature) => {
          return (
            <FeatureRow 
              key={feature._id}
              id={feature._id}
              title={feature.name}
              description={feature.description}
              searchText={searchText}
              categoryId={selectedCategory}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}