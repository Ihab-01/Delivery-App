import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';

interface CardCategorieProps {
  imageUrl: ImageSourcePropType;
  title: string;
}

export default function CardCategorie({ imageUrl, title }: CardCategorieProps) {
  return (
    <TouchableOpacity className='flex items-center mr-2'>
      <Image source={imageUrl} className="w-20 h-20 rounded" />
      <Text className=' text-black font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  );
}