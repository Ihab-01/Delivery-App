import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { ArrowLeftIcon, StarIcon, MapPinIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/solid';

function RestaurantScreen() {
  
  const navigation = useNavigation();
  const router = useRouter();

  const {
    id,
    img,
    title,
    rating,
    genre,
    address,
    description,
    short_description,
    long,
    lat,
    dishes,
  } = useLocalSearchParams<{
    id: string;
    img: string;
    title: string;
    rating: string;
    genre: string;
    address: string;
    description?: string;
    short_description?: string;
    long?: string;
    lat?: string;
    dishes?: any[];
  }>();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
      <ScrollView>
        <View>
          <Image 
            source={{ uri: img }} 
            className="w-full h-56 bg-gray-300"/>
            <TouchableOpacity className='absolute top-20 left-5 bg-gray-300 rounded-full h-10 w-10 flex justify-center items-center'
             onPress={() => {
                    router.push({
                      pathname: '../screens/HomeScreen',
                    });
             }}>
              <ArrowLeftIcon size={20} color={'#000'} />
            </TouchableOpacity>
            <View className='bg-white'>
              <View className='px-4 pt-4 pb-1'>
                <Text className='text-3xl font-bold'>{title}</Text>
              </View>
              <View className='flex-row space-x-2 px-4'>
                <View className='flex-row space-x-1 items-center mr-3'>
                  <StarIcon size={20} color={'#facc15'} opacity={0.5}/>
                  <Text className='text-xs'>
                    <Text className='text-gray-500'>{rating}</Text> - {genre}
                  </Text>
                </View>
                <View className='flex-row space-x-1 items-center'>
                  <MapPinIcon size={20} color={'gray'} opacity={0.5}/>
                    <Text className='text-gray-500 text-xs'>{address}</Text>
                </View>
              </View>
              <Text className='text-gray-400 p-4'>{description}</Text>
            </View>
            <TouchableOpacity className='flex-row items-center px-2 py-1 border border-gray-200'>
              <QuestionMarkCircleIcon size={30} color={'gray'} opacity={0.5}/>
              <Text className='text-gray-600 px-2 font-bold flex-1'>Do You Have Any Food Allegies?</Text>
              <ChevronRightIcon size={30} color={'gray'} />
            </TouchableOpacity>
        </View>
        <View>
          <Text className='px-4 pt-4 mb-3 text-2xl font-bold'>Menu</Text>
        </View>
      </ScrollView>
  )
}

export default RestaurantScreen