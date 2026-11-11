import { ScrollView } from 'react-native';
import CardCategorie from './CardCategorie';
import { useEffect, useState } from 'react';
import client, { urlFor } from '../sanity';

interface CategoriesProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function Categories({ selectedId, onSelect }: CategoriesProps) {

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
            selected={selectedId === category._id}
            onPress={() =>
              onSelect(selectedId === category._id ? null : category._id)
            }
          />
        );
      })}
    </ScrollView>
  );
}