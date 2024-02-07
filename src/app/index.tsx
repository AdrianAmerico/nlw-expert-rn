import { useState, useRef, useMemo } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { CategoryButton, Header, Product } from "@/components";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Link } from "expo-router";
import { useCartStore } from "@/stores";

const Home = () => {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);

  const handleCategorySelected = (selectedCategory: string) => {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (item) => item === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  const cartQuantityItemsMemo = useMemo(() => {
    return cartStore.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }, [cartStore.products]);

  return (
    <View className="flex-1 pt-8">
      <Header
        title="Faça seu pedido"
        cartQuantityItems={cartQuantityItemsMemo}
      />

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

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
      />
    </View>
  );
};

export default Home;
