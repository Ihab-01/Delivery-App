import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import RestaurantsCards from './RestaurantsCards';
import { useEffect, useState } from 'react';
import client from '../../sanity';

interface FeatureRowsProps {
    id: string;
    title: string;
    description: string;
}

const FeatureRows = ({id, title, description}: FeatureRowsProps) => {

  const [featureData, setFeatureData] = useState<any>(null);

  useEffect(()=>{
      console.log("Fetching feature with ID:", id); // 1. Check if ID is received

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
          console.log("Data received for feature:", data); // 2. Check what Sanity returned
          setFeatureData(data);
        }).catch((err) => {
          console.log("Sanity fetch error:", err);
        });
    }, [id]);

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
              <RestaurantsCards 
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

export default FeatureRows