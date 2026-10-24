import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';

interface CardCategorieProps {
  imageUrl: ImageSourcePropType;
  title: string;
}

export default function CardCategorie({ imageUrl, title }: CardCategorieProps) {
  return (
    <TouchableOpacity className='relative mr-2'>
      <Image source={imageUrl} className="w-16 h-16 rounded" />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  );
}