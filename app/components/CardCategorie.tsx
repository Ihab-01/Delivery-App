import { TouchableOpacity, Text, Image } from 'react-native';

interface CardCategorieProps {
  imageUrl: string;
  title: string;
}

const CardCategorie = ({ imageUrl, title }: CardCategorieProps) => {
  return (
    <TouchableOpacity className="mr-4 items-center">
      <Image 
        source={{ uri: imageUrl }} 
        className="w-20 h-20 rounded-full" 
      />
      <Text className="text-xs font-semibold mt-1">{title}</Text>
    </TouchableOpacity>
  );
};

export default CardCategorie;