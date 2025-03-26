import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./custombuttons";

const EmptyState = ({ title, subtitle }) => {
return (
    <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
        <Image
            source={images.empty}
            resizeMode="contain"
            style={{ width: 270, height: 216 }}
        />

        <Text style={{ fontSize: 14, fontFamily: "Poppins-Medium", color: "#B0B0B0" }}>{title}</Text>
        <Text
            style={{
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
                color: "#FFFFFF",
                marginTop: 8,
            }}
        >
            {subtitle}
        </Text>

        <CustomButton
            title="Back to Explore"
            handlePress={() => router.push("/home")}
            containerStyles={{ width: "100%", marginVertical: 20 }}
        />
    </View>
);
};

export default EmptyState;