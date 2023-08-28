import React from "react";
import {
    View,
    Text,Button
} from "react-native";

export default function Settings(){
    return (
        <View>
            <Text>
                hello
            </Text>
            <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
        </View>
    )
}