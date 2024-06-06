import { StyleSheet } from "react-native";
import Colors from "../App/Screen/Utils/Colors";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  centeredView: {
    display: "flex",
    alignItems: "center",
  },
  contentView: {
    height: 400,
    width: "100%",
    marginTop: 100,
    padding: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    // fontFamily: "outfit-light",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  googleSignInButton: {
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 99,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 30,
  },
  googleIcon: {
    width: 50,
    height: 50,
  },
  googleSignInText: {
    // fontFamily: "outfit-semibold",
    fontSize: 20,
    color: Colors.PRIMARY_LIGHT,
    textAlign: "center",
  },
});
