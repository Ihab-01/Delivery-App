import { TouchableOpacity, Text, Image } from 'react-native';

interface CardCategorieProps {
  imageUrl: string;
  title: string;
  selected: boolean;
  onPress: () => void;
}

const CardCategorie = ({ imageUrl, title, selected, onPress }: CardCategorieProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="mr-4 items-center">
      <Image 
        source={{ uri: imageUrl }} 
        className={`w-20 h-20 rounded-full ${selected ? 'border-4 border-[#16c47f]' : ''}`}
      />
      <Text className={`text-xs font-semibold mt-1 ${selected ? 'text-[#16c47f]' : ''}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CardCategorie;