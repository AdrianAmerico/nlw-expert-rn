import { View, FlatList } from "react-native";
import { CategoryButton, Header } from "@/components";
import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";

const Home = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleCategorySelected = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={category === item}
            onPress={() => handleCategorySelected(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
