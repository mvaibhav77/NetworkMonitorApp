import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  isMonitoring: boolean;
  onToggle: () => void;
}

export const MonitorButton = ({ isMonitoring, onToggle }: Props) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isMonitoring) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
    }
  }, [isMonitoring]);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  return (
    <View className="items-center justify-center">
      {isMonitoring && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: 999,
              backgroundColor: "rgba(239, 68, 68, 0.4)", // red-600-ish
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={onToggle}
        className={`${
          isMonitoring ? "bg-red-600" : "bg-green-600"
        } rounded-full p-6 items-center justify-center shadow-lg h-52 w-52`}
      >
        <Text className="text-white text-lg font-semibold">
          {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
