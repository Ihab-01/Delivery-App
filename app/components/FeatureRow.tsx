import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import RestaurantCard from './RestaurantCard';
import { useEffect, useState } from 'react';
import client from '../../sanity';

interface FeatureRowProps {
    id: string;
    title: string;
    description: string;
}

const FeatureRow = ({id, title, description}: FeatureRowProps) => {

  const [featureData, setFeatureData] = useState<any>(null);

  useEffect(()=>{

      client.fetch(`
        *[_type == 'feature' && _id == $id]{
          ...,
          restaurants[]-> {
            ...,
            dishes[]->,
            type[]->{
              name
            }
          }
        }[0]`, {id}).then((data)=>{
          setFeatureData(data);
        })
      },
       [id]);

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
          {featureData?.restaurants?.map((rest: any)=>{
            return(
              <RestaurantCard 
              key={rest._id}
              id={rest._id}
              img={rest.image}
              title={rest.name}
              description={rest.description}
              genre={rest.type?.[0]?.name}
              long={rest.long}
              lat={rest.lat}
              dishes={rest.dishes}
              address={rest.address}
              rating={rest.rating}/>
            )
          })}
        </ScrollView>
    </View>
  )
}

export default FeatureRow