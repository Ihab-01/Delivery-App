import { TouchableOpacity, Text, View , Image, ImageSourcePropType } from 'react-native'
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';

interface RestaurentCardsProps {
    id:string;
    img: ImageSourcePropType;
    title: string;
    description:string;
    genre:string;
    long:number;
    lat:number;
    dishes:any[];
    address:string;
    rating:number;
}

const RestaurantsCards = ({
    id,
    img,
    title,
    description,
    genre,
    long,
    lat,
    dishes,
    address,
    rating
}: RestaurentCardsProps) => {
return (
    <TouchableOpacity className='bg-white mr-3 shadow-slate-200 pb-3 rounded-md'>
      <Image source={img} className="h-36 w-64 rounded-md" />
      <View className='pb-4 px-4'>
        <Text className='font-bold pt-2 text-lg'>{title}</Text>
      </View>
      <View className='flex-row items-center space-x-1 px-2'>
        <StarIcon color={'#facc15'} opacity={0.5} size={22}/>
        <Text>
            <Text className='text-yellow-400'>{rating}</Text> - {genre}
        </Text>
      </View>
      <View className='flex-row items-center space-x-1 pt02 px-2'>
        <MapPinIcon color='gray' opacity={0.5} size={22}/>
        <Text>
            <Text className='text-gray-400'>{address}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default RestaurantsCards