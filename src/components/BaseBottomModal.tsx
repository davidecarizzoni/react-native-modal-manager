import { StyleSheet, Animated, ViewProps } from "react-native";

export const BaseBottomModalContainer = ({ children, style, height, ...props }: ViewProps & { height: number }) => {
  return (
    <Animated.View style={[styles.container, style, { height }]} {...props}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  }
})
