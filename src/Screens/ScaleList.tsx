import {FlatList, StatusBar, ViewToken} from 'react-native';
import React from 'react';
import Box from '../components/layout/Box';
import globalStyle from '../globalStyle/globalStyle';
import ScaleListItem from './components/ScaleListItem';
import {useSharedValue} from 'react-native-reanimated';

const ScaleList = () => {
  const data = new Array(50).fill('f').map((_, index) => ({
    id: index,
  }));
  const viewableItem = useSharedValue<ViewToken[]>([]);
  return (
    <Box flex={1} style={[globalStyle.alignItemsCenter, globalStyle.bgBlack]}>
      <StatusBar hidden />
      <FlatList
        style={[
          globalStyle.flexOne,
          globalStyle.width,
          globalStyle.height,
          globalStyle.bgWhite,
        ]}
        onViewableItemsChanged={({viewableItems}) => {
          viewableItem.value = viewableItems;
        }}
        contentContainerStyle={[globalStyle.pt6]}
        data={data}
        renderItem={({index, item}) => (
          <ScaleListItem
            item={item}
            viewableItem={viewableItem}
            key={index.toString()}
          />
        )}
      />
    </Box>
  );
};

export default ScaleList;
