import { Image, View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid'
import Categories from "../components/Categories";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center pb-2 mx-4 space-x-1 px-4">
        <Image 
          source={require('../assets/images/avatar.png')}
          className="h-16 w-16 p-4 rounded-full bg-gray-200"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={16} color='#000'/>
          </Text>
        </View>
        <UserIcon size={24} color='#16c47f'/>
      </View>
      {/* Search */}
      <View className="flex-row items-center mx-2 px-4">
        <View className="flex-1 flex-row items-center space-x-2 mx-1 px-2 bg-gray-300">
          <MagnifyingGlassIcon size={20} color='#16c47f' />
          <TextInput placeholder="Restaurants And cuisins"
          keyboardType="default"
          className="w-80"/>
        </View>
        <AdjustmentsVerticalIcon color='#16c47f'/>
      </View>
      {/* Body */}
      <ScrollView className="bg-gray-100"
      contentContainerStyle={{paddingBottom:100}}>
        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
}