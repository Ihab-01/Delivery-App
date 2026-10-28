import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import RestaurantsCards from './RestaurantsCards';

interface FeatureRowsProps {
    id: string;
    title: string;
    description: string;
    featureCategories: string;
}

const FeatureRows = ({id, title, description, featureCategories}: FeatureRowsProps) => {
  return (
    <View>
        <View className='flex-row items-center justify-between mt-4 px-4'>
            <Text className='font-bold text-lg'>{title}</Text>
            <ArrowRightIcon color={'#16c47f'}/>
        </View>
        <Text className='text-xs text-gray-400 px-4'>{description}</Text>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className='pt-3'>
          <RestaurantsCards 
          id='1'
          img={require('../assets/images/pizza.jpg')} 
          title='Pizza'
          description='test description'
          genre='food'
          long={0.333}
          lat={0.333}
          dishes={[]}
          address='123-mainstreet'
          rating={4}/>
        </ScrollView>
    </View>
  )
}
export default FeatureRows