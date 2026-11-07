import { ScrollView } from 'react-native';
import CardCategorie from './CardCategorie';
import { useEffect, useState } from 'react';
import client, { urlFor } from '../sanity';

export default function Categories() {

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`
      *[_type == 'category']`).then((data) => {
        setCategories(data);
      })
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 10,
      }}
    >
      {categories?.map((category) => {
        return (
          <CardCategorie 
            key={category._id}
            imageUrl={urlFor(category.image).url()}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
}